// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
// import SideDrawer from './pages/Drawer';
import { Login } from './pages/Login';
import {Routes, Route} from "react-router-dom"
import { Home } from './pages/Home';
import { Private } from './components/Private';
import { Grocery } from './pages/Grocery';
import { Pharmacy } from './pages/Pharmacy';
import { Individual } from './pages/Individual';
import {Link} from "react-router-dom"
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


function App() {

  
  return (
    <div className="App">
      <Navbar />
      <Link to="/" style={{color:"purple"}}>Go back</Link>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Private><Home/></Private>}></Route>
        <Route path="/grocery" element={<Private><Grocery/></Private>}></Route>
        <Route path="/pharmacy" element={<Private><Pharmacy/></Private>}></Route>
        <Route path="/individual/:productId" element={<Private><Individual/></Private>}></Route>
      </Routes>
  
    </div>
  );
}

export default App;
