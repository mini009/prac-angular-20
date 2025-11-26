export interface Investment{
    id:number | null;
    name:string;
    type:'Equity'|'Debt'| 'Mutual Fund';
    amount:number | null;
    purchaseDate:string;
    currentValue:number |null;

}