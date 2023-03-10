import { useDispatch } from "react-redux"
import { add_pokemon as add_to_party } from "./partySlice"
import { PokeType } from "./definePokemon";
import pokemonTypeStyles  from './pokemonTypeStyles'
import { Link } from "react-router-dom";


interface PokeProps {
    pokemon:PokeType,
    index: number
}

const DisplayPokeBox: React.FC<PokeProps> = ({pokemon, index}:PokeProps) => {
    const dispatch = useDispatch();

    function add_pokemon_to_party(pokemon: PokeType)
    {
        dispatch(add_to_party(pokemon))
        return true; 
    }

    return(
        <div className="flex-col text-center">
            <div className="flex justify-center gap-2">
                <Link to={`/pokemon/${pokemon.name}`}><img src={pokemon.sprite} alt={`${pokemon.name} sprite`} className="h-16 md:h-16"/></Link>
                <div className="flex-col gap-2 justify-center">
                    {
                        pokemon.type?.map((pokemonType:string,index)=>{
                            return(
                                <div className={`${pokemonTypeStyles[pokemonType]} font-semibold p-1 rounded text-sm my-1`} key={pokemon.name+":"+pokemonType}>{pokemonType}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div><b>{pokemon.name}</b></div>
            <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 border border-blue-500 hover:border-transparent rounded text-sm px-1'
                onClick={()=>{add_pokemon_to_party(pokemon)}}
            >Add to party</button>
        </div>
    )
}

export default DisplayPokeBox;