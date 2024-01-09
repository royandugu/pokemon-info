import { ReactNode } from "react";
import { useQuery } from "react-query";
import { GET } from "../../api/universalCallers";
import { Dispatch,SetStateAction } from "react";
import { indvDataType } from "../types/types";
import { useEffect } from "react";
import { useContext } from "react";

import context from "../context/context";

const Card=({
    children,
    url,
    id,
    setIndvData,
    setScrollDown
  }: {
    children: ReactNode,
    url:string,
    id:number,
    setIndvData:Dispatch<SetStateAction<indvDataType>>,
    setScrollDown:Dispatch<SetStateAction<boolean>>
  })=>{

    const contextContainer=useContext(context);

    const {data,status,refetch}=useQuery(["indv-children", id],()=>GET(url),{
      staleTime: 1000 * 60 * 60, // 1 hour in milliseconds
    });

    useEffect(()=>{
      if(status === "success"){
        if(data.order === 1){
          setIndvData({abilities:data.abilities,sprite:data.sprites.front_default,height:data.height,order:data.order,base_experience:data.base_experience,name:data.name,stats:data.stats,types:data.types});
        }
      }
    },[status])

    const scrollToTop = () => {
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      });
    };

    useEffect(()=>{
      refetch();
    },[url])

    return(
        <div className={`${contextContainer.isDark?'bg-[#202124]':'bg-white'} border border-[rgb(225,225,225)] cursor-pointer ${contextContainer.isDark?'hover:bg-black':'hover:bg-[rgb(225,225,225)]'} h-[220px] w-[285px] p-5 rounded-3xl ${status==="loading" && 'animate-pulse'}`} onClick={()=>{
          if(status === "success") {
            setIndvData({abilities:data.abilities,sprite:data.sprites.front_default,height:data.height,order:data.order,base_experience:data.base_experience,name:data.name,stats:data.stats,types:data.types});
            if(window.innerWidth<1450) setScrollDown(true);
            else scrollToTop(); 
          }
        }}>
            {status === "success" && (
              <div className="flex items-center justify-center flex-col">
                <img src={data.sprites.front_default}/>
                <div className="text-[rgb(150,150,150)]"> # {data.order} </div>
                <h5 className="text-center text-[20px] font-bold pt-2 capitalize">{children} </h5>
              </div>
            )}
        </div>
    )
}
export default Card;