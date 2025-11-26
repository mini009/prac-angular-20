import { Routes } from '@angular/router';
import { InvestmentList } from './investment-list/investment-list';
import { GetSpecificInfo } from './get-specific-info/get-specific-info';
import { ModifyInvestment } from './modify-investment/modify-investment';
import { DeleteInvestment } from './delete-investment/delete-investment';
import { AddInvestment } from './add-investment/add-investment';

export const routes: Routes = [
    {path:'investmentlist',component:InvestmentList},
    {path:'findMyInvestment',component:GetSpecificInfo},
    {path:'findAndDeleteMyinvestment',component:DeleteInvestment},
    {path:'findAndModidyMyInvestment',component:ModifyInvestment},
    {path:'addNewInvestment',component:AddInvestment}
];
