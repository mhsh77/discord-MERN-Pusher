
import { useSelector } from 'react-redux';
import './App.css';
import Login from './elements/Login';
import Register from './elements/Register';
import Home from './elements/Home';
import { selectUser } from './redux/controllers/userSlice';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
function App() {
  const user = useSelector(selectUser)
  console.log(user)
  return (
    <div className="App flex h-screen">
     
      <BrowserRouter>
          <Routes>
            <Route path="/" element={user?(<Home/>):(<Login/>)} />
            <Route path="/register" element={user?(<Home/>):(<Register/>)} />
            <Route path="/login" element={<Login/>} />
            
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
