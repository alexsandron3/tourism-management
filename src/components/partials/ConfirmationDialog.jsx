import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React, { Component } from 'react';

class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }
  handleClose = ({ target }) => {
    console.log(target.value);
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-confirmarion"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            Este cliente já tem um pagamento no passeio selecionado ao clicar em
            PRÓXIMO você irá para edição de pagamento.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} value={true}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmationDialog;
