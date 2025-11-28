import { Injectable } from "@angular/core";
import { Investment } from "../models/investment.model";

@Injectable({providedIn: 'root'})
export class InvestmentServcie{
    private readonly baseUrl='http://localhost:3000/investments';

    async getAll():Promise<any>{
        const res=await fetch(this.baseUrl);
        if(!res.ok) throw new Error('HTTP ${res.status}');
        return (await res.json()) as Investment[];
    }
}