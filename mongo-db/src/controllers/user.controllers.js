const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { FifoMatchmaker } = require('matchmaking');



// let mm = new FifoMatchmaker(runGame, { checkInterval: 2000 });


const CreateUser = async (req,res) =>{
    try {
        const username = req.body.username;
        const pokeavatar = req.body.pokeavatar;
        const password = req.body.password;
        const pokeid = req.body.pokeid;
        const ready = false;
        const pokecoin = 4;

        const saltRounds = 3;
        const hashpassword = bcrypt.hashSync(password, saltRounds);
        

        const newUser = new User();
        newUser.username = username; 
        newUser.pokeavatar = pokeavatar; 
        newUser.password = hashpassword; 
        newUser.pokecoin = pokecoin;
        newUser.pokeid = pokeid;
        newUser.ready = ready

        await newUser.save();
        
        
        res.send({
            code: 201,
            message: "Utilisateur créé"
        });
        req.username = username;
        req.pokeavatar = pokeavatar;
        req.password = password;
        req.pokecoin = pokecoin;
        req.pokeid = pokeid;
        req.ready = ready;
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const GetUser = async (req,res) =>{
    try {
        const username = req.body.username; 

        const token = jwt.sign({
            data: 'foobar'
        }, 'secret', { expiresIn: '1h' });


        User.findOne({username: username})
        .then(result => {
            const pokeavatar = result.pokeavatar;
            const pokecoin = result.pokecoin;
            const pokeid = result.pokeid;
            res.send({
                code : 201,
                message: "Connection OK",
                token: token,
                username: username,
                pokeavatar: pokeavatar,
                pokecoin:pokecoin,
                pokeid: pokeid
            });
        })


        
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const PatchUser = async (req,res) =>{
    try {
        const username = req.body.username; 
        const newPokecoin = req.body.pokecoin;
        const newPokeid = req.body.pokeid;
        
        const user = await User.findOne({username : username})

        user.pokecoin = newPokecoin;
        user.pokeid.push(newPokeid);

        await user.save();
        
    }
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

const PatchUserPokemon = (req, res) => {
    try {
        const newPokeid = req.body.newpokeid;
        User.updateOne({username: req.body.username}, {
            pokeid: newPokeid
        })
        .then(result => {
            res.send({
                code: 201,
                pokemonid: newPokeid
            })
        })

    } 
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}



/////////////////////////////////////////////



// SI LE USER EST PRET POUR LE COMBAT   
const PatchUserReady = (req, res) => {
    try {
        const username = req.body.username;

        User.updateOne({username: username}, {
            ready: true
        })
        .then(result => {
            res.send({
                code: 201,
                // ready: ready
            })
        })

    } 
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}


const CreateFight = async (req, res) => {
    try {
        const username = req.body.username;

        // USER 1 ET USER2
        const user1 = await User.findOne({username: username})
        const user2 = await User.findOne({ready: true, username: {$ne : username}})


        function getPlayerKey(player) {
            // return player.username;
            return player;
        }


        let mm = new FifoMatchmaker(runGame, getPlayerKey, { checkInterval: 2000 });
        let player1 = user1;
        let player2 = user2;

        mm.push(player1);
        mm.push(player2);
        console.log(mm);
        



        
        // LANCEMENT FIGHT
        function runGame(players) {
            console.log("Game started with:");
            console.log(players[0].username, players[1].username);


            let pokePlayer1 = [];
            let pokePlayer2 = [];


        }

    } 
    catch (error) {
        res.status(500).send("Une erreur est survenue");
        console.log('error', error);
    }
}

module.exports= {
    CreateUser,
    GetUser,
    PatchUser,
    PatchUserPokemon,
    PatchUserReady,
    CreateFight
}