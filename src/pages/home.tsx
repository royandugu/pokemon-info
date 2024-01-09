import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GET } from "../api/universalCallers";
import { indvDataType } from "../components/types/types";
import { useContext } from "react";

import SearchBox from "../components/home/searchBox/searchBox";
import Filters from "../components/home/filters/filters";
import CardDisplays from "../components/home/cardDisplays/cardDisplays";
import IndvPokemonDisplayer from "../components/home/indvPokemonDisplayer/indvPokemonDisplayer";
import context from "../components/context/context";
import PopUp from "../components/common/popUp/popUp";


const Home = () => {

    const contextContainer = useContext(context);
    const [searchContent, setSearchContent] = useState("");
    const [scrollDown, setScrollDown] = useState(false);
    const [pageDetails, setPageDetails] = useState({ startPage: 1, endPage: 100 })
    const [content, setContent] = useState<any>();

    const { data, status } = useQuery("pokemon-list", () => GET(`https://pokeapi.co/api/v2/pokemon?limit=100`));

    const [indvData, setIndvData] = useState<indvDataType>({
        sprite: "",
        abilities: [{ ability: { name: "" } }],
        height: 0,
        order: 0,
        base_experience: "",
        name: "",
        stats: [
            {
                base_stat: 0,
                effort: 0,
                stat: { name: "" }
            }],
        types: [{ type: { name: "" } }]

    })

    useEffect(() => {
        if (status === "success" && data) setContent(data.results);
    }, [status, data])

    const calculateJaccardSimilarity = (str1: string, str2: string) => {
        const set1 = new Set(str1);
        const set2 = new Set(str2);
        const intersection = new Set([...set1].filter((char) => set2.has(char)));
        const union = new Set([...set1, ...set2]);
        const similarity = intersection.size / union.size;
        return similarity;
    };

    const findSimilarStrings = () => {
        if(data){
        const similarStrings = data.results.filter((str: { name: string, url: string }) => {
            const similarity = calculateJaccardSimilarity(searchContent.toLocaleLowerCase(), str.name);
            return similarity >= 0.5;
        });

        setContent(similarStrings);
        }
    };


    if (status === "loading") return <h5> Loading </h5>
    else if (status === "error") return <h5> Error </h5>
    else if (status === "success") {
        return (
            <div className="relative">
                <div className={`flex pl-10 sm:pl-20 pt-10 pr-5 ${contextContainer.isDark ? 'bg-[#303134] text-white' : 'bg-[#eff1f7] text-black'}`}>
                    <div className="flex-1 pr-5">
                        <SearchBox setSearchContent={setSearchContent} contextContainer={contextContainer} findSimilarStrings={findSimilarStrings} />
                        <Filters pageDetails={pageDetails} setPageDetails={setPageDetails} contextContainer={contextContainer} />
                        {content && <CardDisplays data={content} setIndvData={setIndvData} setScrollDown={setScrollDown} />}
                    </div>
                    <div className="w-1/3 hidden r-lg:block r-xl:block r-xl:w-1/4 pt-[150px]">
                        <IndvPokemonDisplayer indvData={indvData} contextContainer={contextContainer} />
                    </div>
                </div>
                <PopUp scrollDown={scrollDown} setScrollDown={setScrollDown} contextContainer={contextContainer}>
                    <IndvPokemonDisplayer indvData={indvData} contextContainer={contextContainer} />
                </PopUp>
            </div>
        )
    }
}
export default Home;