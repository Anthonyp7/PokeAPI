const express = require('express');
const app = express();
const cors = require('cors');
require('./database');
const controllers = require('./controllers/user.controllers');
const controllers2 = require('./controllers/pokemon.controllers');
const dto = require('./dto/user.dto');
// const match = require('./Matchmaking');
app.use(express.json());
app.use(cors());


// USER
app.post(
    '/login',
    dto.dtoCreateUser,
    controllers.CreateUser

);
app.post(
    '/signin',
    dto.dtoGetUser,
    controllers.GetUser
);
app.patch(
    '/login',
    controllers.PatchUser
);
app.patch(
    '/userpokemon',
    controllers.PatchUserPokemon
);
app.patch(
    '/ready',
    controllers.PatchUserReady
);


// POKEMON
app.post(
    '/pokemon',
    controllers2.CreatePokemon
);
app.post(
    '/pokemons',
    controllers2.GetPokemon
);
app.patch(
    '/pokemon',
    controllers2.PatchPokemon
);
app.patch(
    '/pokestats',
    controllers2.PatchPokeStats
);



// MATCH
app.post(
    '/matchmaking',
    // match.CreateMatch
);


app.post(
    '/fight',
    dto.dtoCreateFight,
    controllers.CreateFight
)








app.listen(3080, () => {
    console.log('Server running');
});
