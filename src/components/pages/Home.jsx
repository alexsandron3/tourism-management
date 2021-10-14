import React, { useContext } from 'react';
import { MyContext } from '../../contexts/MyContext';
import Login from './Login';

function Home() {
  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;

  if (isAuth) {
    return (
      <div>
        <p>Logado!</p>
        <button onClick={logoutUser}>Sair!</button>
      </div>
    );
  } else {
    return <p>Não Logado!</p>;
  }
}

export default Home;
