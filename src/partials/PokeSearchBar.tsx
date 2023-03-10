import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {useState, useEffect } from 'react';
import { PokeType } from "./pokemon/definePokemon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PokeSearchBar()
{
    const navigate = useNavigate();
    const all_pokemon = useSelector((state:RootState)=>state.allPokemon.pokemon);
    const [query,setQuery] = useState("")
    const [results,setResults] = useState<PokeType[]>([]);

    function handleQueryChange(event:any)
    {
        const new_query = event.target.value;
        setQuery(new_query)
    }

    useEffect(()=>{
        if(query === "")
        {
            setResults([])
            return;
        }

        const filtered = all_pokemon.filter((pokemon)=>
        pokemon.name.startsWith(query.toLowerCase()));
        setResults(filtered);
    },[query])
    
    return(
        <div className="flex-col">
            <div className="flex justify-center">
                <div className="xl:w-96">
                    <form className="input-group relative flex items-stretch w-full" onSubmit={(e)=>{e.preventDefault(); navigate(`?name=${query}`); setQuery('')}}>
                        <input 
                            value={query}
                            onChange={handleQueryChange}
                            type="search" 
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search"
                            />
                        <Link to={`?name=${query}`} className="btn inlineBlock px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" 
                            onClick={()=>{setQuery('')}}
                            type="submit" id="button-addon2">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                        </Link>
                    </form>
                </div>
            </div>
            {
                query!==""?<div className="bg-white xl:w-96 m-auto max-h-40 overflow-y-scroll">
                    {
                        results.map((result,index)=>
                            <Link to={`/pokemon/${result.name}`}><div 
                                key={"search:"+result.name}
                                className="flex items-center gap-4 hover:bg-red-200 md:px-4 max-w-full"
                            >
                                <div>
                                    {result.name}
                                </div>
                                <img 
                                    src={result.sprite}
                                    className=" h-14"
                                    alt={`searchbar ${result.name}`}/>
                            </div></Link>
                        )
                    }
                </div>:(<></>)
            }

        </div>
    )
}