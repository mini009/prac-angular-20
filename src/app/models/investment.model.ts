export interface Investment{
    id:number;
    name:string;
    type:'Equity'|'Debt'| 'Mutual Fund';
    amount:number;
    purchaseDate:string;
    currentValue:number;

}