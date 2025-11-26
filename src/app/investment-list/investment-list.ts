import { Component, signal } from '@angular/core';
import { Investmentservcies } from '../services/investmentservcies';
import { Investment } from '../models/investment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment-list',
  imports: [CommonModule],
  templateUrl: './investment-list.html',
  styleUrl: './investment-list.css',
})
export class InvestmentList {
  allInvestementsList=signal<Investment[]>([]);
  constructor(protected investmentService: Investmentservcies) {
  
  }

  ngOnInit(){
     this.investmentService.loadInvestments();
   
  }

  displayInvestments(){
    this.allInvestementsList.set(this.investmentService.investments());
  
  }

}
