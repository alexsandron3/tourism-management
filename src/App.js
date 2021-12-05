import Index from './components/pages/Index';
import Appbar from './components/Appbar';
import Cliente from './components/pages/Pesquisar/Cliente';
import Passeio from './components/pages/Pesquisar/Passeio';
import CadPasseio from './components/pages/Cadastrar/Passeio';
import CadCliente from './components/pages/Cadastrar/Cliente';
import CadPagamento from './components/pages/Cadastrar/Pagamento';
import CadDespesa from './components/pages/Cadastrar/Despesa';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar />
        <Switch>
          {/* Pesquisar */}
          <Route path="/pesquisar/cliente" component={Cliente} />
          <Route path="/pesquisar/passeio" component={Passeio} />

          {/* Cadastrar e Editar */}
          <Route path="/cadastrar/pagamento/:id?" component={CadPagamento} />
          <Route path="/cadastrar/cliente/:id?" component={CadCliente} />
          <Route path="/cadastrar/despesa/:id?" component={CadDespesa} />
          <Route path="/editar/cliente/:id?" component={CadCliente} />
          <Route path="/cadastrar/passeio/:id?" component={CadPasseio} />
          <Route path="/editar/passeio/:id?" component={CadPasseio} />
          <Route path="/" component={Index} />
        </Switch>
        <ToastContainer pauseOnFocusLoss />
      </BrowserRouter>
    </>
  );
}

export default App;
