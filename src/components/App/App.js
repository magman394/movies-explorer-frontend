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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import {
  CurrentUserContext,
  defaultUser,
} from "../contexts/CurrentUserContext";
import error from "../../images/error.svg";
import ok from "../../images/ok.svg";
function App() {
  const [isAddRegister, setAddRegister] = React.useState(false);

  const [selectedEmail, setSelectedEmail] = React.useState(localStorage.getItem('email'));
  const [selectedName, setSelectedName] = React.useState(localStorage.getItem('name'));

  
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const history = useHistory();
  const [isEditRegisterPopupOpen, setEditRegisterPopupOpen] =
  React.useState(false);
  const [isInfoTool, setInfoTool] = React.useState({ text: null, img: null });
  const closeAllPopups = () => {
    setEditRegisterPopupOpen(false);
  };
  const [isEditNavigationOpen, setEditNavigationOpen] =
    React.useState(false);
  const [changeShortFilm, setChangeShortFilm] = React.useState(false);
  const [searchMovies, setSearchMovies] = React.useState(JSON.parse(localStorage.getItem('search')));
  const [filtredMovies, setFiltredMovies] = React.useState(JSON.parse(localStorage.getItem('films')));
  const [isGetMovies, setGetMovies] = React.useState();
  const [isGetSavedMovies, setGetSavedMovies] = React.useState();
  const [savefilms, setSavefilms] = React.useState(JSON.parse(localStorage.getItem('savefilms')));

  const [loading, setLoading] = React.useState(true);

  const jwt = localStorage.getItem('token');
  const tokenCheck = () => {
    setTimeout(() => {
      auth
      .authorizeToken(jwt)
      .then((res) => {
      if (res) {
        localStorage.setItem('login', true);

      } 
    })
    .catch((err) => console.log(err));
      setLoading(false);
    }, 200);
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const handleRegisterSubmit = (onRegister) => {
    auth
      .register(onRegister)
      .then((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('login', true);
        localStorage.setItem('name', res.name);
        localStorage.setItem('email', res.email);
        history.push("/movies");
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
          localStorage.setItem('token', data.token);
          localStorage.setItem('login', true);
          localStorage.setItem('name', data.name);
          localStorage.setItem('email', data.email);
          history.push("/movies");
          mainApi
          .getSaveMovies(localStorage.getItem('token'))
          .then((films) => {
            setSavefilms(films);
          })
          .catch((err) => alert(err));
        }
      })
      .catch(() => {

        setEditRegisterPopupOpen(true);
        setInfoTool({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          img: error,
        });
      });
  };
  function onEditProfile(currentUser) {
    mainApi
      .setUserInfo(currentUser, localStorage.getItem('token'))
      .then((response) => {
        setCurrentUser(response);
        localStorage.setItem('name', response.name);
        localStorage.setItem('email', response.email);
        setInfoTool({ text: "Профиль изменен", img: ok });
        setEditRegisterPopupOpen(true);
      })
      .catch(() => {
        setInfoTool({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          img: error,
        });
      });
  }
  function handleReloginSubmit() {
    localStorage.clear();
    setSearchMovies([]);
    setFiltredMovies([]);
    setSavefilms([]);
    history.push("/");
  }
  const [notSearchFilms, setNotSearchFilms] = React.useState(false);
  const handleMovies = (e) => {
    e.preventDefault();
    if(searchMovies.length > 0) {
    moviesApi
        .getMovies()
        .then((films) => {
          films.map(e => {
            e.isLiked = false
          })
            setFiltredMovies(
              films.filter((item) => {
              return item.nameRU.toLowerCase().includes(searchMovies);
            })
            )

        })
        .catch((err) => alert(err));
      mainApi
      .getSaveMovies(jwt)
      .then((films) => {
        setSavefilms(films);
      })
      .catch((err) => alert(err));
    } else {
      setNotSearchFilms(true);
    }
    setGetMovies(true);
  }
  const [notSearchSavedFilms, setNotSearchSavedFilms] = React.useState(false);
  const handleSavedMovies = (e) => {
    e.preventDefault();
    if(searchMovies.length > 0) {
      setSavefilms(
        savefilms.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchMovies);
      })
      )
     } else {
      setNotSearchSavedFilms(true);
    }
    setGetSavedMovies(true);
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
      .changeLikeCardStatus({   
        country: country ? country : 'пусто',
        director: director ? director : 'пусто',
        duration: duration ? duration : 'пусто',
        year: year ? year : 'пусто',
        description: description ? description : 'пусто',
        image: linkMovies + image.url,
        trailer: trailerLink ? trailerLink : "https://www.youtube.com/",
        nameRU: nameRU,
        nameEN: nameEN ? nameEN : 'пусто',
        thumbnail: thumbnail,
        movieId: id,
        user: currentUser,
      }, !isLiked, jwt)
      .then(() => {
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
                return item.nameRU.toLowerCase().includes(searchMovies);
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
    {loading ? (
        <div>...Loading</div>
      ) : (
      <Switch>

      <ProtectedRoute path="/movies">
        <Header
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
          notSearchFilms={notSearchFilms}
          isShortFilms={changeShortFilm}
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
      </ProtectedRoute>
      
      <ProtectedRoute path="/saved-movies">
        <Header
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
          notSearchSavedFilms={notSearchSavedFilms}
          isShortFilms={changeShortFilm}
        />
        <SavedMoviesCardList
          isShortFilms={changeShortFilm}
          savefilms={savefilms}
          filtredMovies={filtredMovies}
          searchMovies={searchMovies}
          isGetSavedMovies={isGetSavedMovies}
          handleCardLike={handleCardLike}
        />
      <Footer />
      </ProtectedRoute>
      
      <ProtectedRoute path="/profile">
        <Header
          onMenu={handleNavigationSubmit}
          onNavigation={closeNavigation}
        />
        <Navigation
          isOpen={isEditNavigationOpen}
          onClose={closeAll}
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
      </ProtectedRoute>
      
      <Route path="/signup">
      {localStorage.getItem('login') ? <Redirect to="/" /> : <Redirect to="/signup" />}
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
      {localStorage.getItem('login') ? <Redirect to="/" /> : <Redirect to="/signin" />}
        <Login
        onLogin={handleAuthorizeSubmit}
        />
        <InfoTooltip
          isOpen={isEditRegisterPopupOpen}
          isInfo={isInfoTool}
          onClose={closeAllPopups}
        />
      </Route>
      <Route exact path="/">
        <Promo
          onMenu={handleNavigationSubmit}
        />
        <Navigation
          isOpen={isEditNavigationOpen}
          onClose={closeAll}
        />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </Route>
      <Route path="" component={Error404} />
      </Switch>
)}
    </CurrentUserContext.Provider>  
    </div>
  );
}

export default App;
