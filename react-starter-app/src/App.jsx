import './App.css';
import { Route, Routes} from "react-router-dom";
import BurgerMenu from './components/burger/burgermenu';
import Search from './components/search'
import Liveboard from './components/liveboard'
import FullApp from './components/fullapp'
import About from './components/about';

// ThoughtSpot
import {
  AuthType,
  init,
 } from "@thoughtspot/visual-embed-sdk";
 
// will be either my1 or my2. 
 const TSURL = "https://my1.thoughtspot.cloud";


function App() {

  init({
    thoughtSpotHost: TSURL,
    authType: AuthType.None
  });

 return (
   <div className="App">
     
     <header>
       <BurgerMenu/> 
     </header>

     <Routes>
       <Route path="/" element={<h1>Home</h1>} />
       <Route path="/search" element={<Search />} />
       <Route path="/liveboard" element={<Liveboard />} />
       <Route path="/fullapp" element={<FullApp />} />
       <Route path="/about" element={<About />} />
     </Routes>
  ThoughtSpot Everywhere Starter App. 
   </div>
 );
}
export default App;
