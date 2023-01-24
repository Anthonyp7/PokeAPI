import { Routes, Route } from "react-router-dom";
import ListePokemon from "./components/Liste";
import Pokedex from "./components/Pokedex";
import Header from "./components/Header";
import Login from "./components/Login";
import Fight from "./components/Fight";
// import Mega from "./components/MegaPokemon";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ListePokemon />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokedex/:username" element={<Pokedex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fight" element={<Fight />} />
        {/* <Route path="/mega" element={<Mega />} /> */}
      </Routes>

    </div>
  );
}

export default App;