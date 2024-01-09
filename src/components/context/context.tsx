import {createContext} from "react";

type ContextType={
    isDark:boolean,
    setIsDark:React.Dispatch<React.SetStateAction<boolean>>
}

const defaultValue:ContextType={
    isDark: false,
    setIsDark: () => {},
};

const context=createContext(defaultValue);

export default context;
