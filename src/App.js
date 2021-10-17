import Index from './components/pages/Index';
import Appbar from './components/Appbar';
import Cliente from './components/pages/Pesquisar/Cliente';
import Passeio from './components/pages/Pesquisar/Passeio';
import CadPasseio from './components/pages/Cadastrar/Passeio';
import CadCliente from './components/pages/Cadastrar/Cliente';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
      <Appbar />
      <Switch> 
        <Route path="/pesquisar/cliente" component={Cliente} />
        <Route path="/pesquisar/passeio" component={Passeio} />
        <Route path="/cadastrar/cliente" component={CadCliente} />
        <Route path="/cadastrar/passeio" component={CadPasseio} />
        <Route path="/" component={Index} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
