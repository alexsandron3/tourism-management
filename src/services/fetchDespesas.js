import axios from 'axios';

const fetchDespesas = async (id) => {
  try {
    const { data } = await axios.post(
      `localhost/SistemaFabio-2.0/api/pagamento.php?idPasseio=${id}`,
    );
    return { data };
  } catch (err) {
    return err;
  }
};
export default fetchDespesas;
