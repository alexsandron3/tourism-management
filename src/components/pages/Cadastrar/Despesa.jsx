import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPayment } from '../../../actions';
import FormDespesa from '../../forms/Despesa';
import Content from '../../partials/Content';
import SelecionarPasseio from '../../partials/SelecionarPasseio';

class Despesa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEventSelect: false,
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    if (params.id) this.showEventSelect();
  }

  showEventSelect = () => {
    this.setState({ showEventSelect: true });
  };

  handlePasseio = ({ target }) => {
    this.setState({ selectPasseio: target.value });
    const { idPasseio } = target.value;
    const { fetchExpense } = this.props;
    fetchExpense(idPasseio);
  };
  render() {
    const { showEventSelect, selectPasseio } = this.state;
    return (
      <Content cardTitle="Cadastrar despesas">
        {showEventSelect && (
          <SelecionarPasseio
            handlePasseio={this.handlePasseio}
            selected={selectPasseio}
          />
        )}
        <FormDespesa />
      </Content>
    );
  }
}
const mapDispatchProps = (dispatch) => ({
  fetchExpense: (id) => dispatch(fetchPayment(id)),
});
export default connect(null, mapDispatchProps)(Despesa);
