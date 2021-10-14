import React, { Component } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid, TextField, FormControlLabel, Checkbox } from '@mui/material';

class DateRange extends Component {
  render() {
    const { handleChange, handleDateChange } = this.props;
    return (
      <Grid container justifyContent="space-around">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TextField
            id="startDate"
            label="Início"
            type="date"
            sx={{ width: 220, marginBottom: '20px' }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
          <TextField
            id="endDate"
            label="fim"
            type="date"
            sx={{ width: 220, marginBottom: '20px' }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Grid container justifyContent="space-around">
          <FormControlLabel
            control={
              <Checkbox size="small" onClick={handleChange} id="showCloseds" />
            }
            label="Exibir Encerrados"
          />
        </Grid>
      </Grid>
    );
  }
}

export default DateRange;
