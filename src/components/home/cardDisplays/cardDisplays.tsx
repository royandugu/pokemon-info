import { Dispatch, SetStateAction } from "react";
import { indvDataType } from "../../types/types";

import Card from "../../card/card";

type CardDisplayProp={
    data:Array<{name:string, url:string}>;
    setIndvData:Dispatch<SetStateAction<indvDataType>>;
    setScrollDown:Dispatch<SetStateAction<boolean>>
}

const CardDisplays=({data,setIndvData,setScrollDown}:CardDisplayProp)=>{
    return(
        <div className="flex justify-center gap-5 p-0">
            <div className="grid sm:pl-[20px] grid-cols-1 r-xs:grid-cols-2 r-sm:pl-0 r-sm:grid-cols-3 r-md:grid-cols-4 r-lg:grid-cols-3 r-xl:grid-cols-4 gap-y-10 mt-5">
                {data.map((dt: { name: string, url: string }, id: number) => (
                    <div key={id} className="m-5">
                        <Card url={dt.url} id={id} setIndvData={setIndvData} setScrollDown={setScrollDown}>
                            <h5> {dt.name}</h5>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardDisplays;