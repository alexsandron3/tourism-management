import { Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import moment from 'moment';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setNewEvent, fetchPayment } from '../../actions';
import ConfirmationDialog from './ConfirmationDialog';
class SelecionarPasseio extends Component {
  constructor(props) {
    super(props);
    this.state = { passeios: [], showDialog: false };
  }
  componentDidMount() {
    this.fetchPasseios();
  }
  fetchPasseios = async () => {
    this.setState({ isLoading: true });
    const {
      data: { passeio = [] /* success, message */ },
    } = await axios({
      method: 'GET',
      url: `http://localhost/SistemaFabio-2.0/api/passeio.php?pesquisarPasseio=`,
    });

    this.setState({ passeios: passeio, isLoading: false });
  };

  handlePasseio = async ({ target }) => {
    const { dispatchSetEvent, dispatchFetchPayment, clientReducer } =
      this.props;
    dispatchSetEvent(target.value);
    const dispatchValue = [target.value.idPasseio, clientReducer.idCliente];
    dispatchFetchPayment(dispatchValue);
    this.setState({ selectedPasseio: target.value, isLoading: true });
  };

  render() {
    const { passeios, selectedPasseio } = this.state;
    const { paymentReducer, handlePasseio, selected } = this.props;
    return (
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        textAlign="center"
        p={3}
      >
        {paymentReducer.showDialog && <ConfirmationDialog />}
        <FormControl fullWidth>
          <InputLabel id="passeios">Passeios: </InputLabel>
          <Select
            labelId="passeios"
            value={selected || selectedPasseio || ''}
            label="Passeio: "
            name="selectedPasseio"
            onChange={handlePasseio || this.handlePasseio}
          >
            {passeios.map((passeio) => {
              return (
                <MenuItem value={passeio} key={nanoid()}>
                  {`${passeio.nomePasseio} EM ${moment(
                    passeio.dataPasseio,
                  ).format('DD/MM/YYYY')} ${passeio.idPasseio}`}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchSetEvent: (value) => dispatch(setNewEvent(value)),
  dispatchFetchPayment: (params) => dispatch(fetchPayment(params)),
});

const mapStateToProps = (state) => ({ ...state });
export default connect(mapStateToProps, mapDispatchToProps)(SelecionarPasseio);
