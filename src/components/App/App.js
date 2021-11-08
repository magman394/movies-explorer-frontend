import React from "react";
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Route, Switch } from "react-router-dom";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Promo from "../Main/Promo/Promo";
import NavTab from "../Main/NavTab/NavTab";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs";
import AboutMe from "../Main/AboutMe/AboutMe";
import Portfolio from "../Main/Portfolio/Portfolio";
import Register from "../Sign/Register/Register";
import Login from "../Sign/Login/Login";
import Profile from "../Sign/Profile/Profile";
import Error404 from "../Errors/404/404";
import { cards } from "../../utils/constants";


function App() {
  const [isEditNavigationOpen, setEditNavigationOpen] =
    React.useState(false);
  const handleNavigationSubmit = () => {
    setEditNavigationOpen(true)
  }
  const closeNavigation = () => {
    setEditNavigationOpen(false)
  }
  const closeAll = () => {
    setEditNavigationOpen(false)
  }
  return (
    <div className="App">
      <Switch>
      <Route path="/main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </Route>
      <Route path="/movies">
        <Header
          Relogin={true}
          onMenu={handleNavigationSubmit}
          onNavigation={closeNavigation}
        />
        <Navigation
          isOpen={isEditNavigationOpen}
          onClose={closeAll}
        />
        <SearchForm />
        <MoviesCardList
          onCardClick={1}
          cards={cards}
          onCardLike={0}
          onCardDelete={1}
        />
        <Footer />
      </Route>
      <Route path="/saved-movies">
        <Header
          Relogin={true}
          onMenu={handleNavigationSubmit}
          onNavigation={closeNavigation}
        />
        <SearchForm />
        <MoviesCardList
          onCardClick={1}
          cards={cards}
          onCardLike={0}
          onCardDelete={1}
        />
      <Footer />
      </Route>
      <Route path="/signup">
        <Register />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/profile">
        <Header
          Relogin={true}
        />
        <Profile
          name={"Василий"}
          email={"ya.ru"}
        />
      </Route>
      <Route path="" component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
