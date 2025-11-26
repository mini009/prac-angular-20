import { Component, computed, inject, signal } from '@angular/core';
import { Investmentservcies } from '../services/investmentservcies';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap } from 'rxjs';
import { Investment } from '../models/investment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-specific-info',
  imports: [CommonModule],
  templateUrl: './get-specific-info.html',
  styleUrl: './get-specific-info.css',
})
export class GetSpecificInfo {

private svc=inject(Investmentservcies);
//UI state (Signals)
id= signal<number | null>(null);
loading=signal<boolean>(false);
error=signal('');

showData:boolean=false;

showDataSet(){
  this.showData=true;
}

//stream from iod siagnal
private id$=toObservable(this.id).pipe(  //toObservable converts signal to observable
  debounceTime(150),
  distinctUntilChanged()
);

//Data siganal
investment = toSignal<Investment | null>(
  this.id$.pipe(
    switchMap(id=>{
      this.error.set('');
      if(id===null || Number.isNaN(id)){
        this.loading.set(false);
        return of(null)
      }

      this.loading.set(true);
      return this.svc.getInvestmentById(id).pipe(
        finalize(()=>{
          this.loading.set(false);
        }),
        catchError(err=>{
          console.log('Error fetching investment',err);
          this.error.set('Unable to fetch investments,pl schkeck id.');
          return of(null)
        })
      )
      
    })
  ),

  {initialValue:null}

);

//Dervied feild for @for rendering

fields=computed(()=>{
  const inv=this.investment();
  if(!inv){
    return [];
  }
 const inr=(n:number)=> new Intl.NumberFormat('en-IN',{
    style:'currency',
    currency:'INR',
    maximumFractionDigits:2
  }).format(n);

  return [
    {label:'ID',value:String(inv.name)},
    {label:'Type',value:inv.type},
    {label:'Amount',value:inv.amount !== null ? inr(inv.amount) : 'N/A'}, //inr converts to indian rupees
    {label:'Purchase Date',value:new Date(inv.purchaseDate).toLocaleDateString('en-IN')},
    {label:'Current Value',value:inv.currentValue !== null ? inr(inv.currentValue) : 'N/A'},
  ];

});

//Event handler signal only no ngMOdel
onIdInput(event:Event):void{
  this.showData=false;
  const raw=(event.target as HTMLInputElement).value;
  const num=raw==='' ? null : Number(raw);
  this.id.set(Number.isFinite(num!)?num:null);

}


}
