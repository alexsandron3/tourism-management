import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enableButton } from '../../actions';

class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }
  handleClose = () => {
    this.setState({ open: false });
    const { dispatchEnableButton } = this.props;
    dispatchEnableButton();
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
          <Button onClick={this.handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEnableButton: () => dispatch(enableButton()),
});

export default connect(null, mapDispatchToProps)(ConfirmationDialog);
