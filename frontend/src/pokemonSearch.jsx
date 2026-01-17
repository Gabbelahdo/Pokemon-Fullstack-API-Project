import {useState} from "react";

function PokemonSearch(){
    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;


    const fetchPokemon = async (e) => {
        e.preventDefault();
        if(!search.trim()){
            setError("Skriv in ett pokemon-namn");
            return;
        }

        setLoading(true);
        setError("");
        setPokemon(null);

        try{
            

            const response = await fetch(
                 `${API_URL}/pokemon/${search.toLowerCase()}`
            );
         
            if(!response.ok){
                throw new Error();
            }
            const data = await response.json();
            setPokemon(data);
        }
 catch(err){
    setError("Pokemon existerar ej");
    setPokemon(null);
 } finally{
    setLoading(false);
 }
    };

    return (

        <div className="innehåll">
        <input 
        type="search"
        placeholder="Search for Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

        <button className="submit-knapp" onClick={fetchPokemon}>Sök</button>

        {loading && <p>Laddar Pokemon....</p>}
        {error && <p className="error-msg">{error}</p>}

        {pokemon && !loading && (
          <>
          <img className="pokemon-bild" src={pokemon.image} alt={pokemon.name} />
          <h2 className="karaktär-namn">Namn: {pokemon.name}</h2>
          <p className="karaktär-typ">Typ: {pokemon.types.join(", ")}</p>
          <p className="karaktär-förmåga">Förmågor: {pokemon.abilities.join(", ")}</p>
           
          </>  
        )

        }
        </div>
    );

}


export default PokemonSearch;