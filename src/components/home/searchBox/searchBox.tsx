import { Dispatch, SetStateAction } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { MdCatchingPokemon } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";

type SearchBoxProps={
    setSearchContent:Dispatch<SetStateAction<string>>
    contextContainer:any
    findSimilarStrings:()=>void
}

const SearchBox = (props:SearchBoxProps) => {

    return (
        <div className="flex items-center gap-5">
            <div className={`flex-1 ${props.contextContainer.isDark?'bg-[#202124] text-white':'bg-white text-black'} relative rounded-3xl shadow-lg placeholder-[rgb(200,200,200)] h-50 w-full pl-5 pr-10`}>
                <input type="text" className={`p-5 w-full outline-none ${props.contextContainer.isDark&&'bg-[#202124]'}`} placeholder="Search your pokemon" onChange={(e) => props.setSearchContent(e.target.value)} />
                <div className="absolute right-[20px] top-[12px]"> <MdCatchingPokemon size={40} className="text-[#e83e34] rotate-on-hover cursor-pointer" onClick={props.findSimilarStrings}/> </div>
            </div>
            <div className={`${props.contextContainer.isDark ? 'bg-[rgb(220,220,220)]' : 'bg-[rgb(10,10,10)]'} h-10 w-10 rounded-full flex justify-center items-center ${props.contextContainer.isDark?'text-black':'text-white'} cursor-pointer` } onClick={()=>props.contextContainer.setIsDark(!props.contextContainer.isDark)}>
                {props.contextContainer.isDark?<TiWeatherSunny size={30}/>:<IoIosMoon size={30}/>}
            </div>
       </div>
    )
}
export default SearchBox;