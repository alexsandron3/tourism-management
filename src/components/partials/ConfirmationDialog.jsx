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
    if (target.value === 'true') {
      return alert(1);
    } else {
      this.setState({ open: false });
    }
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
            Este cliente já tem um pagamento no passeio selecionado,
            redirecionar para edição de pagamento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} value={true}>
            Sim
          </Button>
          <Button onClick={this.handleClose} value={false}>
            Não
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmationDialog;
