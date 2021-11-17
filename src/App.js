import Index from './components/pages/Index';
import Appbar from './components/Appbar';
import Cliente from './components/pages/Pesquisar/Cliente';
import Passeio from './components/pages/Pesquisar/Passeio';
import CadPasseio from './components/pages/Cadastrar/Passeio';
import CadCliente from './components/pages/Cadastrar/Cliente';
import CadPagamento from './components/pages/Cadastrar/Pagamento';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
    <BrowserRouter>
      <Appbar />
      <Switch> 
        <Route path="/pesquisar/cliente" component={Cliente} />
        <Route path="/pesquisar/passeio" component={Passeio} />
        <Route path="/cadastrar/pagamento/:id?" component={CadPagamento} />
        <Route path="/cadastrar/cliente/:id?" component={CadCliente} />
        <Route path="/editar/cliente/:id?" component={CadCliente} />
        <Route path="/cadastrar/passeio/:id?" component={CadPasseio} />
        <Route path="/editar/passeio/:id?" component={CadPasseio} />
        <Route path="/" component={Index} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
