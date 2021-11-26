import React from "react";
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import SavedSearchForm from "../../components/SavedMovies/SavedSearchForm/SavedSearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SavedMoviesCardList from "../SavedMovies/SavedMoviesCardList/SavedMoviesCardList";
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
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { linkMovies } from "../../utils/constants";
import {
  CurrentUserContext,
  defaultUser,
} from "../contexts/CurrentUserContext";
import error from "../../images/error.svg";
import ok from "../../images/ok.svg";
function App() {
  const [isAddRegister, setAddRegister] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [selectedEmail, setSelectedEmail] = React.useState(localStorage.getItem('email'));
  const [selectedName, setSelectedName] = React.useState(localStorage.getItem('name'));

  
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const history = useHistory();
  const [isEditRegisterPopupOpen, setEditRegisterPopupOpen] =
  React.useState(false);
  const [isInfoTool, setInfoTool] = React.useState({ text: null, img: null });
  const closeAllPopups = () => {
    setEditRegisterPopupOpen(false);
    if (isAddRegister === true) history.push("/signin");
    setInfoTool({ text: null, img: null });
  };
  const [isEditNavigationOpen, setEditNavigationOpen] =
    React.useState(false);
  const [changeShortFilm, setChangeShortFilm] = React.useState();
  const [searchMovies, setSearchMovies] = React.useState(JSON.parse(localStorage.getItem('search')));
  const [filtredMovies, setFiltredMovies] = React.useState(JSON.parse(localStorage.getItem('films')));
  const [isGetMovies, setGetMovies] = React.useState(false);
  const [savefilms, setSavefilms] = React.useState(JSON.parse(localStorage.getItem('savefilms')));



  const jwt = localStorage.getItem('token');
  React.useEffect(() => {
    auth
      .authorizeToken(jwt)
      .then((res) => {
      if (res){
          setLoggedIn(true);
          localStorage.setItem('name', res.name);
          localStorage.setItem('email', res.email);
      } else {history.push("/signin")}
    })
    .catch((err) => console.log(err));
  }, [loggedIn]);

  const handleRegisterSubmit = (onRegister) => {
    auth
      .register(onRegister)
      .then(() => {
        setInfoTool({ text: "Вы успешно зарегистрировались!", img: ok });
        setEditRegisterPopupOpen(true);
        history.push("/signin");

      })
      .catch(() => {
        setInfoTool({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          img: error,
        });
        setEditRegisterPopupOpen(true);
      });
  };

  const handleAuthorizeSubmit = (onLogin) => {
    if (!onLogin) {
      return;

    }
    auth
      .authorize(onLogin)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch(() => {
        setLoggedIn(false);
        setEditRegisterPopupOpen(true);
        setInfoTool({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          img: error,
        });
      });
  };

  function onEditProfile(currentUser) {

    mainApi
      .setUserInfo(currentUser, jwt)
      .then((response) => {
        setCurrentUser(response);
        localStorage.setItem('name', response.name);
        localStorage.setItem('email', response.email);
        setInfoTool({ text: "Профиль изменен", img: ok });
        setEditRegisterPopupOpen(true);
      })
      .catch((err) => {
        setInfoTool({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          img: error,
        });
      });
  }
  function handleReloginSubmit() {
    localStorage.removeItem("token");
    history.push("/signin");
    setLoggedIn(false);
  }

  const handleMovies = (e) => {
    e.preventDefault();
    if(searchMovies.length > 1) {
    moviesApi
        .getMovies()
        .then((films) => {
          films.map(e => {
            e.isLiked = false
          })
            setFiltredMovies(
              films.filter((item) => {
              return item.nameRU.includes(searchMovies);
            })
            )

        })
        .catch((err) => alert(err));
      }

  }
  const handleSavedMovies = (e) => {
    e.preventDefault();
    if(searchMovies.length > 1) {
      setSavefilms(
        savefilms.filter((item) => {
        return item.nameRU.includes(searchMovies);
      })
      )
     }
  }

  localStorage.setItem('search', JSON.stringify(searchMovies));
  function handleCardLike(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
    isLiked,
    thumbnail
  ) {
    mainApi
    .getUserInfo(jwt)
    .then((user) => {
      setCurrentUser(user);
    })
    .catch((err) => alert(err));
    setGetMovies(true)

    mainApi
      .changeLikeCardStatus({   
        country: country ? country : 'пусто',
        director: director ? director : 'пусто',
        duration: duration ? duration : 'пусто',
        year: year ? year : 'пусто',
        description: description ? description : 'пусто',
        image: linkMovies + image.url,
        trailer: trailerLink ? trailerLink : 'пусто',
        nameRU: nameRU,
        nameEN: nameEN ? nameEN : 'пусто',
        thumbnail: thumbnail,
        movieId: id,
        user: currentUser,
      }, !isLiked, jwt)
      .then((send) => {

        mainApi
          .getSaveMovies(jwt)
          .then((films) => {
            setSavefilms(films);
          })
          .catch((err) => alert(err));
        moviesApi
          .getMovies()
          .then((films) => {
            films.map(e => {
              e.isLiked = false
            })
              setFiltredMovies(
                films.filter((item) => {
                return item.nameRU.includes(searchMovies);
              })
              )
        })
          .catch((err) => alert(err));
          
      })
      .catch((err) => alert(err));
  }
  localStorage.setItem('films', JSON.stringify(filtredMovies));
  localStorage.setItem('savefilms', JSON.stringify(savefilms));

  const handleNavigationSubmit = () => {
    setEditNavigationOpen(true)
  }
  const closeNavigation = () => {
    setEditNavigationOpen(false)
  }
  const closeAll = () => {
    setEditNavigationOpen(false)
  }


  function handleChangeShortFilmsFilter(change)  {
    setChangeShortFilm(change)
  }

  return (
    <div className="App">
    <CurrentUserContext.Provider value={currentUser}>

      <Switch>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
      </Route>
      <Route path="/main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </Route>

      <Route exact path="/movies">
      {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
        <Header
          Relogin={true}
          onMenu={handleNavigationSubmit}
          onNavigation={closeNavigation}
        />
        <Navigation
          isOpen={isEditNavigationOpen}
          onClose={closeAll}
        />
        <SearchForm
          onShortFilms={handleChangeShortFilmsFilter}
          onHandleMovies={handleMovies}
          onSetSearchMovies={setSearchMovies}
        />
        <MoviesCardList
          isShortFilms={changeShortFilm}
          savefilms={savefilms}
          filtredMovies={filtredMovies}
          searchMovies={searchMovies}
          isGetMovies={isGetMovies}
          handleCardLike={handleCardLike}
        />
        <Footer />
      </Route>
      <Route path="/saved-movies">
      {loggedIn ? <Redirect to="/saved-movies" /> : <Redirect to="/signin" />}
        <Header
          Relogin={true}
          onMenu={handleNavigationSubmit}
          onNavigation={closeNavigation}
        />
        <Navigation
          isOpen={isEditNavigationOpen}
          onClose={closeAll}
        />
        <SavedSearchForm
          onShortFilms={handleChangeShortFilmsFilter}
          onHandleMovies={handleSavedMovies}
          onSetSearchMovies={setSearchMovies}
        />
        <SavedMoviesCardList
          isShortFilms={changeShortFilm}
          savefilms={savefilms}
          filtredMovies={filtredMovies}
          searchMovies={searchMovies}
          isGetMovies={isGetMovies}
          handleCardLike={handleCardLike}
        />
      <Footer />
      </Route>
      <Route path="/profile">
      {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/signin" />}
        <Header
          Profile={true}
        />
        <Profile
          editProfileName={selectedName}
          editProfileEmail={selectedEmail}
          onEditProfile={onEditProfile}
          Relogin={handleReloginSubmit}
        />
        <InfoTooltip
          isOpen={isEditRegisterPopupOpen}
          isInfo={isInfoTool}
          onClose={closeAllPopups}
        />
      </Route>
      <Route path="/signup">
        <Register 
        onRegister={handleRegisterSubmit}
        />
        <InfoTooltip
          isOpen={isEditRegisterPopupOpen}
          isInfo={isInfoTool}
          onClose={closeAllPopups}
        />
      </Route>
      <Route path="/signin">
        <Login
        onLogin={handleAuthorizeSubmit}
        />
        <InfoTooltip
          isOpen={isEditRegisterPopupOpen}
          isInfo={isInfoTool}
          onClose={closeAllPopups}
        />
      </Route>
      <Route path="" component={Error404} />
      </Switch>
    </CurrentUserContext.Provider>  
    </div>
  );
}

export default App;
