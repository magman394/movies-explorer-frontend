class MainApi {
    constructor({url}) {
      this.url = url
    }
    getSaveMovies(jwt) {
      return fetch(`${this.url}/api/movies`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*",
        'Authorization': `Bearer ${jwt}`
      }
      })
      .then(res => this._getResponseData(res))
    }
      changeLikeCardStatus({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }, check, jwt) {
        if(check === true) {
          return fetch(`${this.url}/api/movies`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json",
              "Access-Control-Request-Headers": "*",
              "Access-Control-Request-Method": "*",
              'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
              "country": country,
              "director": director,
              "duration": duration,
              "year": year,
              "description": description,
              "image": image,
              "trailer": trailer,
              "nameRU": nameRU,
              "nameEN": nameEN,
              "thumbnail": thumbnail,
              "movieId": movieId,
            })
          })
          .then(res => this._getResponseData(res))
      } else {
        return fetch(`${this.url}/api/movies/${movieId}`,  {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
            'Authorization': `Bearer ${jwt}`
          }
        })
        .then(res => this._getResponseData(res))
      }
      }
      getUserInfo(jwt) {
        return fetch(`${this.url}/api/users/me`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        })
        .then(res => this._getResponseData(res))
      }
      setUserInfo(onUpdateUser, jwt) {
        return fetch(`${this.url}/api/users/me`, {
          method: "PATCH",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
            'Authorization': `Bearer ${jwt}`
          },
          body: JSON.stringify({
            "name": onUpdateUser.name,
            "email": onUpdateUser.email,
          }) }).then(res => this._getResponseData(res))
      }
    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }
  }
  
  const mainApi = new MainApi({
    url: 'http://diplom.nomoredomains.monster',
    });
  export default mainApi;
    
    
    