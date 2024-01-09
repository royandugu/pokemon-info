import { Dispatch, SetStateAction } from "react";

type FiltersProps={
    pageDetails:{startPage:number,endPage:number};
    setPageDetails:Dispatch<SetStateAction<{startPage:number,endPage:number}>>
    contextContainer:any;
}
const Filters=(props:FiltersProps)=>{
    return(
        <div className="flex justify-end items-center mt-5">
            <div className="flex items-center gap-2">
                <h5 className="text-bold"> From </h5>
                <div className={` border border-[rgb(200,200,200)] h-10 pl-3 pr-3 justify-center items-center flex ${props.contextContainer.isDark?'bg-black':'bg-white'}`}>
                    {props.pageDetails.startPage}
                </div>
                <h5 className="text-bold"> To </h5>
                <div className={` border border-[rgb(200,200,200)] h-10 pl-3 pr-3 justify-center items-center flex ${props.contextContainer.isDark?'bg-black':'bg-white'}`}>
                    {props.pageDetails.endPage}
                </div>
            </div>
        </div>
    )
}
export default Filters;