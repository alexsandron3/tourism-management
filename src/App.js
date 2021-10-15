import Index from './components/pages/Index';
import Appbar from './components/Appbar';
import Login from './components/pages/Login';
import Cliente from './components/pages/Pesquisar/Cliente';
import Passeio from './components/pages/Pesquisar/Passeio';
import Home from './components/pages/Home';
import MyContextProvider from './contexts/MyContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
      <Appbar />
      <Switch> 
        <Route path="/pesquisar/cliente" component={Cliente} />
        <Route path="/pesquisar/passeio" component={Passeio} />
        <Route path="/" component={Index} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
