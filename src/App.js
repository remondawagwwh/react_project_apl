import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} />
          
        </Route>

        <Route path="/register" component={Register} />

        <Route path="/movie/:id">
          {isLoggedIn ? <MovieDetails /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/favorites">
          {isLoggedIn ? <Favorites /> : <Redirect to="/login" />}
        </Route>

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
