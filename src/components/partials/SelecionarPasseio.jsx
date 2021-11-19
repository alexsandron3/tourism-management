import { Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import moment from 'moment';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setNewEvent, fetchPayment } from '../../actions';
class SelecionarPasseio extends Component {
  constructor(props) {
    super(props);
    this.state = { passeios: [] };
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

  handlePasseio = ({ target }) => {
    const { dispatchSetEvent, dispatchFetchPayment, clientReducer } =
      this.props;

    dispatchSetEvent(target.value);
    const dispatchValue = [target.value.idPasseio, clientReducer.cliente];
    dispatchFetchPayment(dispatchValue);
    this.setState({ selectedPasseio: target.value, isLoading: true });
    this.setState({ isLoading: false });
  };

  render() {
    const { passeios, selectedPasseio } = this.state;
    return (
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        textAlign="center"
        p={3}
      >
        <FormControl fullWidth>
          <InputLabel id="passeios">Passeios: </InputLabel>
          <Select
            labelId="passeios"
            value={selectedPasseio || ''}
            label="Passeio: "
            name="selectedPasseio"
            onChange={this.handlePasseio}
            // onBlur={() => console.log('opa')}
            // sx={{ minWidth: '50%' }}
          >
            {passeios.map((passeio) => {
              // console.log(passeio);
              return (
                <MenuItem value={passeio} key={nanoid()}>
                  {`${passeio.nomePasseio} EM ${moment(
                    passeio.dataPasseio
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
