import "./App.css";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (  
      <Router>
          <Routes>

          <Route exact path="/" element={<Login/>} />
            
          <Route path="/dashboard" element={<Dashboard/>} />

          <Route path="*" element={<Navigate to ="/" />}/>

          </Routes>
          
      </Router>
  );
}
  
export default App;