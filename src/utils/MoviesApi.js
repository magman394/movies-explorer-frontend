class MoviesApi {
  constructor({url}) {
    this.url = url
  }
  getMovies() {
    return fetch(`${this.url}`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "Access-Control-Request-Method": "*",
    }
    })
    .then(res => this._getResponseData(res))
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  });
export default moviesApi;
  
  
  