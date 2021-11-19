import axios from 'axios';

export const fetchPagamento = async (idPasseio, idCliente) => {
  const { data } = await axios({
    method: 'GET',
    url: `http://localhost/SistemaFabio-2.0/api/pagamento.php?idPasseio=${idPasseio}&idCliente=${idCliente}`,
  });

  return {
    data,
  };
};

export const sendPayment = async (info) => {
  const { data } = await axios({
    method: 'POST',
    url: `http://localhost/SistemaFabio-2.0/api/pagamento.php?`,
    data: { ...info },
  });
  return {
    data,
  };
};
