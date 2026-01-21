import {useState} from "react";

function PokemonSearch(){
    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;



    const fetchPokemon = async (e) => {
        e.preventDefault();

        //test-debug rad 17-27
         console.log("=== DEBUG START ===");
    console.log("API_URL from env:", import.meta.env.VITE_API_URL);
    console.log("Search term:", search);


      const testURL = `${import.meta.env.VITE_API_URL}/pokemon/${search.toLowerCase()}`;

      console.log("Full URL being constructed:", testURL);
    console.log("URL length:", testURL.length);
    console.log("=== DEBUG END ===");

        if(!search.trim()){
            setError("Skriv in ett pokemon-namn");
            return;
        }

        setLoading(true);
        setError("");
        setPokemon(null);

        try{
            

            /*const response = await fetch(
                 `${API_URL}/api/pokemon/${search.toLowerCase()}`
            );*/
            
            //test debug rad 43-46
            const response = await fetch(testURL);
        console.log("Response status:", response.status);
        console.log("Response ok?", response.ok);
         
            if(!response.ok){
                throw new Error();
            }
            const data = await response.json();
            console.log("Data received:", data); //test
            setPokemon(data);
        }
 catch(err){
    console.error("Fetch error:", err);
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