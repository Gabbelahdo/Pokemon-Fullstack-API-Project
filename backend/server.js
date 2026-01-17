import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;



app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
res.send("API is online!")
});

app.get("/api/pokemon/:name", async(req, res) =>{
    const { name } = req.params;
     
    try{
        const response = await fetch(
            `${process.env.POKE_API_BASE}/${name.toLowerCase()}`
        );

        if(!response.ok){
           return res.status(404).json({ error: "Pokemon existerar ej" });
        }

        const data = await response.json();

        const PokemonFigur = {
           name: data.name,
           image: data.sprites.front_default,
           types: data.types.map(t => t.type.name),
           abilities: data.abilities.map(a => a.ability.name)

        };

        res.json(PokemonFigur);

        const cache = {};

if(cache[name]){
    return res.json(cache[name]);
}

cache[name] = PokemonFigur;



    } catch(err){
     res.status(500).json({error: "Server error"})
    }


});



app.listen(PORT, () => {
console.log(`Backend körs på http://localhost:${PORT}`)
});

