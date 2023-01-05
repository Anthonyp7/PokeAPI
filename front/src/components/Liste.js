import { useState, useEffect} from "react";
import '../styles/Liste.css';
import '../styles/PokemonColors.css';
import ModalTest from "./Modal";
import React from 'react';
import Button from 'react-bootstrap/Button';


export default function ListePokemon(){
    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);
  const [imageani, setImageAni] = useState([]);
  const [imageaniback, setImageAniBack] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = React.useState(false);

  // INFO POKEMON
  const [type, setType] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // INFO STATS POKEMON
  const [statsHp, setStatsHp] = useState([]);
  const [statsAttack, setStatsAttack] = useState([]);
  const [statsSpeed, setStatsSpeed] = useState([]);

  // INFO POKEMON MODAL
  const [pokeModal, setPokeModal] = useState("");
  const [pokeModalImg, setPokeModalImg] = useState("");
  const [pokeModalImg2, setPokeModalImg2] = useState("");
  const [pokeModalHeight, setPokeModalHeight] = useState("");
  const [pokeModalWeight, setPokeModalWeight] = useState("");
  const [pokeModalType, setPokeModalType] = useState("");

  // INFO STATS POKEMON MODAL
  const [pokeModalHp, setPokeModalHp] = useState("");
  const [pokeModalAttack, setPokeModalAttack] = useState("");
  const [pokeModalSpeed, setPokeModalSpeed] = useState("");

  // const [pokemonId, setPokemonId] = useState("");


  const [pokemonUrl, setPokemonUrl] = useState("");
  

    
  async function fetchData(){
    return new Promise((resolve, reject) => { 
       fetch ("https://pokeapi.co/api/v2/pokemon")
        .then((res)=>res.json())
        .then((data)=>{
          resolve(data)
          // console.log(data)
        })
        })
  }
  
  fetchData()


  //PAGE SUIVANTE
  const next = () => {
    const newUrl = {
      current: url.next,
      previous: url.current,
      next: null,
    };
    setUrl(newUrl);
  };

  //PAGE PRECEDENTE
  const previous = () => {
    const newUrl = {
      current: url.previous,
      next: url.current,
      previous: null,
    };
    setUrl(newUrl);
  };


  useEffect(() => {
    // console.log(url)
    fetch(url.current)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        // console.log(data)
        setUrl({
          current: url.current,
          next: data.next,
          previous: data.previous,
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [url.current]);
  

  useEffect(() => {

    setImage([])
    setImage2([])
    setImageAni([])
    setHeight([])
    setWeight([])
    setType([])

    pokemons.map((pokemon) => (

        fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => {

        // console.log(data)

        //SET IMG
        setImage((current) => [...current, data.sprites.front_default]);
        //data.sprites.other['official-artwork'].front_default
        //data.sprites.versions['generation-v']['black-white'].animated.front_default
        setImage2((current) => [...current, data.sprites.front_shiny]);
        setImageAni((current) => [...current, data.sprites.versions['generation-v']['black-white'].animated.front_default]);
        setImageAniBack((current) => [...current, data.sprites.versions['generation-v']['black-white'].animated.back_default]);

        // SET INFO
        setHeight((current) => [...current, data.height]);
        setWeight((current) => [...current, data.weight]);
        setType((current) => [...current, data.types.map(type => type.type.name + " ")]);

        // SET STATS
        setStatsHp((current) => [...current, data.stats[0].base_stat]);
        setStatsAttack((current) => [...current, data.stats[1].base_stat]);
        setStatsSpeed((current) => [...current, data.stats[5].base_stat]);
      })
      .catch((err) => console.error(err))
    ))
    
  }, [pokemons]);

  


  return (
    <div>
      <br></br>
      {loading ? <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> : <h1 className="load-h1">Liste Pokémon</h1>}
      <br></br>
      <h2 font-family ="pokemon_classicregular,arial, sans-serif" className="load-h1">Passez la souris sur les Pokemons pour voir les formes shinys</h2>
      <br></br>

      <div className="pagination-top">
        {url.previous && <button  class="btn btn-dark" onClick={previous}>Previous</button>}
        {url.next && <button  class="btn btn-dark" onClick={next}>Next</button>}
      </div>

      
      {/* {setPokemonId(pokemons.url.replace(/[^\d]/g, "").substring(1))} */}
      {/* {console.log(pokemons[url.replace(/[^\d]/g, "").substring(1)])} */}
      
        {pokemons.map((pokemon, index) => (
          

          <div class={type[index]} id="test">

        {/* {console.log(pokemonUrl)} */}
        {/* {setPokemonUrl(pokemon)} */}
        {/* {console.log(pokemon.url)} */}
        

            <div class="card-body">
              <h5 className="pokemon-name" key={index}> {pokemon.url.replace(/[^\d]/g, "").substring(1)} • {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h5>

              <div class="image">
                <img className="img-poke" src={image[index]} alt="" />
              </div>
              <div class="image-hover">
                <img className="img-poke" src={image2[index]} alt="" />
              </div>


                {/* INFO POKEMON */}
                  <div  className="type-li" >
                    <ul class={type[index]}>
                      <li class="list-group-item">{type[index]}</li>
                    </ul>
                  </div>

                  {/* {console.log(pokemon.name, pokemon.url.replace(/[^\d]/g, "").substring(1), statsHp[pokemon.url.replace(/[^\d]/g, "").substring(1)])} */}
                  
                  


                  {/* {setPokemonId(pokemons[index].url.replace(/[^\d]/g, "").substring(1))} */}

                  {/* {console.log(pokemons[index].url.replace(/[^\d]/g, "").substring(1))} */}

                  <Button variant="primary" onClick={() => {setModalShow(true); 
                    setPokeModal(pokemon.name[0].toUpperCase() + pokemon.name.substring(1)); 
                    setPokeModalImg(imageani[index]); 
                    setPokeModalImg2(imageaniback[index]); 
                    setPokeModalHeight(height[index]); 
                    setPokeModalWeight(weight[index]); 
                    setPokeModalHp(statsHp[pokemon.url.replace(/[^\d]/g, "").substring(1)]); 
                    setPokeModalAttack(statsAttack[index]); 
                    setPokeModalSpeed(statsSpeed[index]); 
                    setPokeModalType(type[index])}}>
                    See More
                  </Button>
                                    
            </div>
            
                <ModalTest
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    name={pokeModal}
                    img={pokeModalImg}
                    img2={pokeModalImg2}
                    stathp={pokeModalHp}
                    statattack={pokeModalAttack}
                    statspeed={pokeModalSpeed}
                    height={pokeModalHeight/10}
                    weight={pokeModalWeight/10}

                    type={pokeModalType}
                  />

          </div>

        ))}
            
      <div className="pagination-bottom">
        {url.previous && <button class="btn btn-dark" onClick={previous}>Previous</button>}
        {url.next && <button class="btn btn-dark" onClick={next}>Next</button>}
      </div>

      <br/>
      <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"} alt="{pokemon}" />
    </div>
  );
}