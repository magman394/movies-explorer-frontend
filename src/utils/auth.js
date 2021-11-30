class Auth {
        constructor({url}) {
            this.url = url
          }
      register(onRegister) {
      return fetch(`${this.url}/api/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "password": onRegister.password,
            "email": onRegister.email,
            "name": onRegister.name
        })
      })
      .then(res => this._getResponseData(res))
    }; 
    _getResponseData(res) {
      if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json({
        "data": {
            "_id": "",
            "email": ""
        }
    });
    }
    authorize(onLogin) {
        return fetch(`${this.url}/api/signin`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": onLogin.password,
                "email": onLogin.email
            })
          })
          .then(res => this._getResponseData(res))
          .then((data) => {
            if (data.token){
              localStorage.setItem('token', data.token);
              return data;
            }
          })
    }
    authorizeToken(token) {
      return fetch(`${this.url}/api/users/me`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(res => this._getResponseData(res))
      } 
    }
    const auth = new Auth({
        url: 'http://localhost:3000'
       });
      
    
    export default auth;
    
    
    