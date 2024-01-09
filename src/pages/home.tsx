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
import { Helmet } from "react-helmet";


const Home = () => {
    const contextContainer = useContext(context);
    const [searchContent, setSearchContent] = useState("");
    const [scrollDown, setScrollDown] = useState(false);
    const [pageDetails, setPageDetails] = useState({ startPage: 1, endPage: 100 })
    const [content, setContent] = useState<any>();

    const pageTitle = `Explore the Ultimate World of Pokémon - Uncover Fascinating Facts!`;
    const pageDescription = `Dive into the captivating universe of Pokémon with our comprehensive guide. Discover intriguing facts and informations about the beloved Pokémon franchise. Whether you're a seasoned trainer or a curious newcomer, our Pokémon website is your go-to resource for all things Pokémon!`;

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
        if (data) {
            const similarStrings = data.results.filter((str: { name: string, url: string }) => {
                const similarity = calculateJaccardSimilarity(searchContent.toLocaleLowerCase(), str.name);
                return similarity >= 0.5;
            });

            setContent(similarStrings);
        }
    };


    if (status === "loading") return (
        <div className="flex justify-center items-start h-screen pt-[20%]">
        <div className="pokemon" />
        </div>
    )
    else if (status === "error") return <h5> Error </h5>
    else if (status === "success") {
        return (
            <div className="relative">

                <Helmet>
                    <title>{pageTitle}</title>
                    <meta name="description" content={pageDescription} />
                    <meta name="keywords" content="Pokémon Universe, Pokémon Games,Pokémon Facts,Pokémon Trivia,Pokémon Franchise,Pokémon World,Explore Pokémon,Pokémon Enthusiasts,Pokémon Fansite,Pokémon Information Hub"/>
                    <meta name="author" content="Your Name" />

                    {/* Open Graph (OG) tags for better social media sharing */}
                    <meta property="og:title" content={pageTitle} />
                    <meta property="og:description" content={pageDescription} />
                    <meta property="og:type" content="website" />
                    
                </Helmet>

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