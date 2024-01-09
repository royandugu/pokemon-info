"use client"

import { useState } from "react";
import Context from "./context";

const ContextState=(props:any)=>{
    const [isDark,setIsDark]=useState(false);

    const collection={
        isDark:isDark,
        setIsDark:setIsDark
    }

    return(
        <Context.Provider value={collection}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextState;