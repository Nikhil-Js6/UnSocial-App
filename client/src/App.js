import { useContext } from "react";
import "./app.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Footer from "./components/footer/Footer";
import { AuthContext } from "./context/authContext";
import Messenger from "./pages/messenger/Messenger";

function App() {

   const {user} = useContext(AuthContext);
   
   return (
      <Router>
          <Switch>
             <Route exact path="/">
                { user ? <Home /> : <Redirect to="/register"/> }
             </Route>
             <Route path="/login">
                { user ? <Redirect to="/" /> : <Login /> }
             </Route>
             <Route path="/register">
                { user ? <Redirect to="/" /> : <Register /> }
             </Route>
             <Route path="/messenger">
                <Messenger />
             </Route>
             <Route path="/profile/:username">
                <Profile />
             </Route>
          </Switch>
          <Footer />
      </Router>
   );
}

export default App;
