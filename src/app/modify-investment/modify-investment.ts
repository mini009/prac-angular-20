import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Investment } from '../models/investment.model';
import { FormsModule } from '@angular/forms';
import { Investmentservcies } from '../services/investmentservcies';

@Component({
  selector: 'app-modify-investment',
  imports: [FormsModule],
  templateUrl: './modify-investment.html',
  styleUrl: './modify-investment.css',
})
export class ModifyInvestment {
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
      this.subs.push(this.svc.modifyInvestment(this.investment.id,this.investment).subscribe((data:any)=>{
        if(data)
        {
          alert('Investment modifies successfully!');
        }
      },
      (error) => {
        alert('Error modifying investment:');
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
