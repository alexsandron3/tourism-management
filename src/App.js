import "./App.css";
import { Header } from "./components/Header";
import "bulma/css/bulma.min.css";
import Index from "./components/Index";
import Despesa from "./components/forms/Despesa";
function App() {
  return (
    <>
      <Header />
      <Despesa />
    </>
  );
}

export default App;
