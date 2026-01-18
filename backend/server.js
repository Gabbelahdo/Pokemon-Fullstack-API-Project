import express from "express";
import path from "path";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const cache = {};



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;




app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});



app.get("/api/pokemon/:name", async(req, res) =>{
    const { name } = req.params;
     
    if(cache[name]){
    return res.json(cache[name]);
}



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
        
        cache[name] = PokemonFigur;
        res.json(PokemonFigur);





    } catch(err){
     res.status(500).json({error: "Server error"})
    }


});



app.listen(PORT, () => {
console.log(`Backend körs på http://localhost:${PORT}`)
});

