import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Investmentservcies } from '../services/investmentservcies';
import { Investment } from '../models/investment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-investment',
  imports: [FormsModule],
  templateUrl: './add-investment.html',
  styleUrl: './add-investment.css',
})
export class AddInvestment {
  subs:Subscription[]=[];
  constructor(public svc:Investmentservcies){}
  investment:Investment = {
    id: null,
    name: '',
    type: 'Mutual Fund',
    amount: null,
    purchaseDate: '',
    currentValue: null
  };

  onSubmit(form: any) {
    if (form.valid) {
      this.subs.push(this.svc.addInvestment(this.investment).subscribe((data)=>{
        if(data)
        {
          alert('Investment added successfully!');
        }
      },
      (error) => {
        alert('Error adding investment:');
        // Show error message or handle the error as needed
      }
        
      ));
      console.log('Form Submitted', this.investment);
      // Here you can send the data to a server or handle it further
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe());
  }


}
