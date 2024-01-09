import { Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";


const PopUp=({
    children,
    scrollDown,
    setScrollDown,
    contextContainer
  }: {
    children: ReactNode,
    scrollDown:boolean,
    setScrollDown:Dispatch<SetStateAction<boolean>>;
    contextContainer:any;
  })=>{

    const [windowWidth,setWindowWidth]=useState(window.innerWidth);

    window.addEventListener("resize",()=>setWindowWidth(window.innerWidth));

    return(
        <div>
            <div className={`absolute bg-[rgba(0,0,0,.7)] top-0 left-0 right-0 bottom-0 ${(!scrollDown || windowWidth>1450) && 'hidden'}`} onClick={()=>setScrollDown(false)}/>
            <div className={`fixed top-[100px] left-[10%] right-[10%] ${contextContainer.isDark ?'bg-[#202124] text-white':'bg-white'} p-5 h-[700px] overflow-scroll rounded-3xl ${scrollDown ? 'block' : 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}
export default PopUp;