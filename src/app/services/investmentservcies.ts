import { ChangeDetectorRef, Injectable, signal } from '@angular/core';
import { Investment } from '../models/investment.model';
import { HttpClient } from '@angular/common/http';

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

}
