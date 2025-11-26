import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Investmentservcies } from '../services/investmentservcies';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-investment',
  imports: [FormsModule],
  templateUrl: './delete-investment.html',
  styleUrl: './delete-investment.css',
})
export class DeleteInvestment {

  id:number | null = null;
 subs:Subscription[]=[];
   constructor(public svc:Investmentservcies){}
    investment = {
       id: null,
  
     };
  onSubmit(form: any) {
    console.log('Form Submitted 1', this.id);
    if (form.valid) {
      this.subs.push(this.svc.deleteInvestment(this.investment.id).subscribe((data)=>{
          alert('Investment deleted  successfully!');
          form.resetForm();
        
      },
      (error) => {
        alert('Error deleting investment:');
        // Show error message or handle the error as needed
      }
        
      ));
      console.log('Form Submitted', this.investment.id);
      // Here you can send the data to a server or handle it further
    } else {
      console.log('Form is invalid');
    }
  }
  ngOnDestroy(){
    this.subs.forEach(sub=>sub.unsubscribe());
  }

}
