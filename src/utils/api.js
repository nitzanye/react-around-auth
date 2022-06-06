class Api {
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _checkResStatus = (res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    }

    getInitialCards = () => {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
        }).then(this._checkResStatus);
      }

    getUserData = () => {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
        }).then(this._checkResStatus);
      }

}

export default new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "a68c011d-d292-456c-86c3-53eebc4a76ba",
        "Content-Type": "application/json",
  } 
});

