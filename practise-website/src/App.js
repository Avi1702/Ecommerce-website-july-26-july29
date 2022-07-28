// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
// import SideDrawer from './pages/Drawer';
import { Login } from './pages/Login';
import {Routes, Route} from "react-router-dom"
import { Home } from './pages/Home';
import { Private } from './components/Private';


function App() {

  
  return (
    <div className="App">
      <Navbar />
      
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Private><Home/></Private>}></Route>
      </Routes>
  
    </div>
  );
}

export default App;
