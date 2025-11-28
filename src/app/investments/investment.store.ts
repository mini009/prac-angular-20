import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Investment } from "../models/investment.model";
import { computed, inject } from "@angular/core";
import { InvestmentServcie } from "./investments.service";

type InvestmentState={
    investments:Investment[];
    isLoading:boolean;
    error:string|null;
    
    
}
export  const InvestmentStore=signalStore(
    {
        providedIn:'root'
    },
    //1) State
    withState<InvestmentState>({
        investments:[],
        isLoading:false,
        error:null
    }),

    //Derived values
    withComputed(({investments})=>({
        totalInvested:computed(()=>investments().reduce((sum, i) => sum + (i.amount ?? 0), 0)),
    
    totalCurrent:computed(()=>investments().reduce((sum, i) => sum + (i.currentValue ?? 0), 0)),

    
    totalGain:computed(() => {
        const list=investments();
        const invested=list.reduce((sum, i) => sum + (i.amount ?? 0), 0);
        const current=list.reduce((sum, i) => sum + (i.currentValue ?? 0), 0);
        return current - invested;
    }),

    })

),

// 3)Mothod (no Observable exposed)

withMethods((store,service=inject(InvestmentServcie))=>({
    async loadAll(){
        patchState(store,{isLoading:true, error:null});

        try{
            const data=await service.getAll();
            patchState(store,{investments:data, isLoading:false});
        }

        catch(error:any){
            patchState(store,{error:error.message, isLoading:false});
        }
    }
})),


//4)Lifecycle :auto-load on first-use
withHooks({
    onInit(store){
        store.loadAll();
    }
})
)