import { indvDataType } from "../../types/types";

type IndvPokemonDisplayerpropss = {
    indvData: indvDataType,
    contextContainer:any
}

const IndvPokemonDisplayer = (props: IndvPokemonDisplayerpropss) => {

    return (
        <div className={`${props.contextContainer.isDark?'bg-[#202124]':'bg-white'} rounded-3xl pt-0 p-5 pb-10`}>
            <div className="flex w-fulll justify-center items-center">
                <div className={`flex justify-center ${props.contextContainer.isDark?'bg-[#303134]':'bg-[#f2f2f2]'} h-[300px] w-[300px] rounded-full mb-10 mt-10`}>
                    <img src={props.indvData.sprite} className="w-full" />
                </div>
            </div>
            <div className=" relative flex justify-center">
                <div className="content text-center">
                    <h5 className=" font-bold text-[rgb(150,150,150)]"> # {props.indvData.order} </h5>
                    <h5 className="capitalize text-[30px] font-bold"> {props.indvData.name} </h5>
                    <div className="flex justify-center items-center gap-2">
                        {props.indvData.types.map((tp, id: number) => (
                            <div className="mt-2 p-2 rounded bg-green-500 text-white" key={id}>
                                <h5 className="text-center"> {tp.type.name} </h5>
                            </div>
                        ))}
                    </div>
                    <h1 className="mt-10 font-bold"> Abilities : </h1>
                    <div className="flex mt-5 gap-3">
                        {props.indvData.abilities.map((ab, id: number) => (
                            <div className={`border border-[#e83e34] px-5 p-3 rounded-3xl text-[15px] ${props.contextContainer.isDark?'text-white':'text-black'} hover:bg-[#e83e34] hover:text-white cursor-pointer`} key={id}> {ab.ability.name} </div>
                        ))}
                    </div>
                    <div className="flex gap-5">
                        <div className="w-full">
                            <h5 className="font-bold text-center mt-10"> Height : </h5>
                            <div className={`${props.contextContainer.isDark?'bg-black':'bg-[#f6f8f9]'} mt-2 py-2`}>
                                <p className="mt-1 text-[15px] text-[rgb(130,130,130)] font-bold"> {props.indvData.height} </p>
                            </div>
                        </div>
                        <div className="w-full">
                            <h5 className="font-bold text-center mt-10"> Base Exp : </h5>
                            <div className={`${props.contextContainer.isDark?'bg-black':'bg-[#f6f8f9]'} mt-2 py-2`}>
                                <p className="mt-1 text-[15px] text-[rgb(130,130,130)] font-bold"> {props.indvData.base_experience} </p>
                            </div>
                        </div>
                    </div>
                    <h5 className="mt-10 font-bold"> Stats : </h5>

                    {props.indvData.stats.map((st, id: number) => (
                        <div key={id} className="bg-[#e83e34] relative text-white mt-5 py-2 rounded-3xl">
                            <h1> {st.stat.name} </h1>
                            <div className="absolute flex items-center justify-center bg-white text-black border border-[#e83e34] top-[-5px] left-[-10px] h-[50px] w-[50px] rounded-full">
                                <h1> {st.base_stat} </h1>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
export default IndvPokemonDisplayer;    