import { ChangeDetectorRef, Injectable, signal } from '@angular/core';
import { Investment } from '../models/investment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Investmentservcies {
  private apiUrl = 'http://localhost:3000/investments';

  //Signal to hold investmenst

  investments=signal<Investment[]>([]);

  constructor(private http: HttpClient) {

  }
  
  loadInvestments() {
    this.http.get<Investment[]>(this.apiUrl).subscribe((data) => {
      this.investments.set(data);
      console.log('fro, servsice',this.investments());
 
    });
  }

  //Fetch single invest by Id
  getInvestmentById(id: number) :Observable<Investment>{
    return this.http.get<Investment>(`${this.apiUrl}/${id}`);
  }

  //add fresh investment
  addInvestment(investment: Investment): Observable<Investment> {
    console.log('this investment',investment);
    return this.http.post<Investment>(`${this.apiUrl}`, investment);
  }

  //delete investment
  deleteInvestment(id: number |null): Observable<void> {
    console.log('Deleting investment with id:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //modify investment
  modifyInvestment(id: number |null,investment:Investment): Observable<void> {
    console.log('MOdifying investment with id:', id,investment);
    return this.http.patch<void>(`${this.apiUrl}/${id}`, investment);
  }

}
