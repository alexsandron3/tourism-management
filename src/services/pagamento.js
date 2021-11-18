import axios from 'axios';

export const fetchPagamento = async (idPasseio, idCliente) => {
  // console.log(idPasseio, idCliente);
  // const { selectedPasseio } = this.state;
  // const { eventReducer } = this.props;
  // this.setState({ isLoading: true });

  const { data } = await axios({
    method: 'GET',
    url: `http://localhost/SistemaFabio-2.0/api/pagamento.php?idPasseio=${idPasseio}&idCliente=${idCliente}`,
  });
  // console.log(data);

  return {
    data,
    // paymentExists: true,
    // isButtonDisabled: false,
    // pagamento: { ...pagamento[0] },
  };
  // if (success === 1) {
  //   // this.setState({);
  // } else {
  //   return {
  //     isButtonDisabled: false,
  //   };
  //   // this.setState({ isButtonDisabled: false });
  // }
  // this.setState({ isLoading: false });

  // console.log(...pagamento);
};
