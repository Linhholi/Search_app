import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Suburbs from "./pages/suburbs/suburbs.jsx";
import Customers from "./pages/customers/customers.jsx";
import Suburbs1 from "./pages/suburbs1/suburbs1.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/customers" element={<Customers/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
