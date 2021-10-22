import { Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import Passeio from '../pages/Cadastrar/Passeio';
class SelecionarPagamento extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { passeio, handleChange, selectedPasseio } = this.props;
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
            onChange={handleChange}
            // onBlur={() => console.log('opa')}
            // sx={{ minWidth: '50%' }}
          >
            {passeio.map((passeio) => {
              console.log(passeio);
              return (
                <MenuItem value={passeio} key={nanoid()}>
                  {passeio.nomePasseio}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    );
  }
}

export default SelecionarPagamento;
