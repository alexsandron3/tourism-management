import React, { createContext, Component } from 'react';
import axios from 'axios';
export const MyContext = createContext();

const Axios = axios.create({
  baseUrl: 'https://apifabio.herokuapp.com/Projetos/SistemaFabio-2.0/api/',
});
class MyContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {
    showLogin: true,
    isAuth: false,
    theUser: null,
  };
  logoutUser = () => {
    localStorage.removeItem('loginToken');
    this.setState({
      ...this.state,
      isAuth: false,
    });
  };
  loginUser = async ({ username, password }) => {
    const login = await Axios.post(
      'https://apifabio.herokuapp.com/Projetos/SistemaFabio-2.0/api/login.php',
      {
        username: username,
        password: password,
      }
    );
    return login.data;
  };
  isLoggedIn = async () => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      Axios.defaults.headers.common['Authorization'] = `bearer ${loginToken}`;
      const { data } = await Axios.get(
        'https://apifabio.herokuapp.com/Projetos/SistemaFabio-2.0/api/user-info.php'
      );
      if (data.success && data.user) {
        this.setState({
          ...this.state,
          isAuth: true,
          theUser: data.user,
        });
      }
    }
  };
  render() {
    const contextValue = {
      rootState: this.state,
      isLoggedIn: this.isLoggedIn,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
    };
    return (
      <MyContext.Provider value={contextValue}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyContextProvider;
