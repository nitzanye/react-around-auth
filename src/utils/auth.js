export const BASE_URL = 'https://register.nomoreparties.co';

// check the base url

const handleResponse = res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const register = (password, email) => {
      return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
      })
      .then(handleResponse); 
}
    export const authorize = (password, email) => {
      return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
      })
      .then(handleResponse);
    }
      // .then((response => response.json()))
      // .then((data) => {
      //   if (data.jwt) {
      //     localStorage.setItem('jwt', data.jwt);
      //     return data;
      //   }
      // })
 

    export const checkUserToken = (token) => {
      return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(handleResponse);
    }



    // export const authorize = (identifier, password) => {
    //   return fetch(`${BASE_URL}/signin`, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({identifier, password})
    //   })
    //   .then((response => response.json()))
    //   .then((data) => {
    //     if (data.jwt) {
    //       localStorage.setItem('jwt', data.jwt);
    //       return data;
    //     }
    //   })
    //   .catch(err => console.log(err))
    // };



// //getUser / getToken
// export const checkUserToken = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       }
//     })
//     .then(res => res.json())
//     .then(data => data)
//   }

  //install jwt and put my jwt inside the {token}
