import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { add_pokemon as add_to_all } from './partials/pokemon/allPokemonSlice';

import info_axios from './lib/api/pokeinfo_api'
import { RootState } from "./app/store";
import { PokeType, StatType } from "./partials/pokemon/definePokemon";

import './index.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import PokemonInfo from './pages/PokemonInfo';
import PartyPokemonInfo from './pages/PartyPokemonInfo';

import { add_nature } from './partials/pokemon/miscSlice';

export default function App()
{
    const [localAllPokemon,setLocalAllPokemon] = useState<PokeType[]>([])

    const dispatch = useDispatch()
    const all_pokemon = useSelector((state:RootState)=>state.allPokemon.pokemon);

    useEffect(()=>{ // initial setup
        async function setAllPokemon()
        {
            let request = await info_axios.get('/generation/generation-i')
            const local_all_pokemon:PokeType[] = [];
            for(let i = 0; i<request.data.pokemon_species.length; i++)
            {
                const pokemon = request.data.pokemon_species[i];
                const name:string = pokemon.name;
                let image_url_name = name;

                if(name === 'nidoran-f') // the image url's name is slightly different for some specific cases
                    image_url_name = 'nidoran_f'
                if(name === 'nidoran-m')
                    image_url_name = 'nidoran_m'
                if(name === 'mr-mime')
                    image_url_name = 'mr.mime'

                const url = `https://projectpokemon.org/images/normal-sprite/${image_url_name}.gif`

                const dispatch_pokemon: PokeType = {
                    name: name,
                    sprite: url,
                }

                dispatch(add_to_all(dispatch_pokemon))
                local_all_pokemon.push(dispatch_pokemon)
            }

            request = await info_axios.get('/generation/generation-ii')
            for(let i = 0; i<request.data.pokemon_species.length; i++)
            {
                const pokemon = request.data.pokemon_species[i];
                let name:string = pokemon.name;
                const url = `https://projectpokemon.org/images/normal-sprite/${name}.gif`

                const dispatch_pokemon: PokeType = {
                    name: name,
                    sprite: url,
                }

                dispatch(add_to_all(dispatch_pokemon))
                local_all_pokemon.push(dispatch_pokemon)
            }

            request = await info_axios.get('/generation/generation-iii')
            for(let i = 0; i<request.data.pokemon_species.length; i++)
            {
                const pokemon = request.data.pokemon_species[i];
                let name:string = pokemon.name;
                const url = `https://projectpokemon.org/images/normal-sprite/${name}.gif`

                const dispatch_pokemon: PokeType = {
                    name: name,
                    sprite: url,
                }

                dispatch(add_to_all(dispatch_pokemon))
                local_all_pokemon.push(dispatch_pokemon)
            }

            return local_all_pokemon;
        }

        async function fetchNatures() {
            let request = await info_axios.get('/nature')
            
            for(let i in request.data.results)
            {
                let nature:any = {};
                let current_nature = request.data.results[i];
                const id = current_nature.url.match(/nature\/(\d+)\/$/)[1];

                nature['name'] = current_nature.name;
                nature['id'] = id;
                nature['index'] = i;
                
                let details = await info_axios.get(`/nature/${id}`);
                if(details.data.increased_stat===null)
                    nature['increased_stat'] = details.data.increased_stat;  
                else 
                    nature['increased_stat'] = details.data.increased_stat.name;  

                if(details.data.decreased_stat===null)
                    nature['decreased_stat'] = details.data.decreased_stat;  
                else 
                    nature['decreased_stat'] = details.data.decreased_stat.name;  
                
                dispatch(add_nature(nature));
            }
        }

        async function initial_setup()
        {
            if(all_pokemon.length < 1)
            {
                let local_all_pokemon = await setAllPokemon();
                setLocalAllPokemon(local_all_pokemon)
            }
            else
            {
                setLocalAllPokemon(all_pokemon);
            }

            fetchNatures();
        }

        initial_setup();
    },[])

    return(
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="pokemon" element={<Home/>}/>
            <Route path="pokemon/:pokemonName" element={<PokemonInfo/>}/>
            <Route path="party/:index" element={<PartyPokemonInfo/>}/>
        </Routes> 
    )
}