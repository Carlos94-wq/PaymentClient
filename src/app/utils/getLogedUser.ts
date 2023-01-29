import * as userSession from 'src/app/auth/interfaces/userSession';


  export const getLoggedUser = (): userSession.default =>{
    const user: userSession.default = JSON.parse(`${sessionStorage.getItem("user")}`);
    return user
  }
