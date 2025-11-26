import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Investmentservcies } from '../services/investmentservcies';
import { Investment } from '../models/investment.model';


type InvestmentFormModel={
  id:FormControl<number>;
  name:FormControl<string>;
  type:FormControl<'Equity'|'Mutual Fund'>;
  amount:FormControl<number>;
  purchaseDate:FormControl<string>;
  currentValue:FormControl<number>;
};

@Component({
  selector: 'app-add-investment-reactive',
  imports: [ReactiveFormsModule],
  templateUrl: './add-investment-reactive.html',
  styleUrl: './add-investment-reactive.css',
})

export class AddInvestmentReactive {
  private readonly fb=inject(NonNullableFormBuilder);
  private readonly investmentService=inject(Investmentservcies);

  isSubmitting=signal(false);
  serverError=signal<string|null>(null);
  successMsg=signal<string|null>(null);

  form:FormGroup<InvestmentFormModel>=this.fb.group({
    id:this.fb.control<number>(0,{validators:[Validators.required,Validators.min(1)]}),
    name:this.fb.control<string>('',{validators:[Validators.required,Validators.minLength(2)]}),
    type:this.fb.control<'Equity'|'Mutual Fund'>('Equity',{validators:[Validators.required]}),
    amount:this.fb.control<number>(0,{validators:[Validators.required,Validators.min(1)]}),
    purchaseDate:this.fb.control<string>('',{validators:[Validators.required]}),
    currentValue:this.fb.control<number>(0,{validators:[Validators.required,Validators.min(0)]}),
  });

  get f(){
    return this.form.controls;
  }

  ngOnInit(){
    this.investmentService.loadInvestments();
 }

  onSubmit():void{
    this.serverError.set(null);
    this.successMsg.set(null);

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payload:Investment=this.form.getRawValue();
   // payload.id=Number(payload.id);

    if(this.investmentService.investments().some(
      x=>x.id===payload.id)){
      this.serverError.set('Investment with the same ID already exists.');
      return ;
    }

    this.isSubmitting.set(true);
         
      this.investmentService.addInvestment(payload).subscribe({
        next:(data)=>{
          this.isSubmitting.set(false);
          this.successMsg.set('Investment added successfully!');
          this.form.reset({
            id:0,
            name:'',
            type:'Equity',
            amount:0,
            purchaseDate:'',
            currentValue:0
          });
        },
        error:(err)=>{
          this.isSubmitting.set(false);
          this.serverError.set('Error adding investment: '+(err?.message||'Unknown error'));
        },
        complete:()=>{
          this.isSubmitting.set(false);
        }
      });
    
  }

}
