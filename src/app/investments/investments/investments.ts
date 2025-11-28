import { Component, inject } from '@angular/core';
import { InvestmentStore } from '../investment.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investments',
  imports: [CommonModule],
  templateUrl: './investments.html',
  styleUrl: './investments.css',
})
export class Investments {
readonly store=inject(InvestmentStore);
}
