import React, { Component } from 'react';
import {
  DataGrid,
  ptBR,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridOverlay,
} from '@mui/x-data-grid';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import jsPDF from 'jspdf';
import { IconButton, LinearProgress } from '@mui/material';

class TableComponent extends Component {
  handlePrint = () => {
    const { row } = this.props;
    const doc = new jsPDF();
    doc.text('RELATÓRIO GERENCIAL DE VENDAS', 20, 10);
    const pdfBody = row.map((column) => Object.values(column));
    doc.autoTable({
      columns: [...this.props.col],

      body: [...pdfBody],
    });

    doc.save('table.pdf');
  };
  CustomToolbar = () => {
    return (
      <GridToolbarContainer xs={{ marginBottom: 100 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={() => this.handlePrint('appBarOpened', true)}
        >
          <LocalPrintshopIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };
  CustomLoadingOverlay = () => {
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  };
  render() {
    const { columns, row, id, isLoading } = this.props;
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          components={{
            Toolbar: this.CustomToolbar,
            LoadingOverlay: this.CustomLoadingOverlay,
          }}
          loading={isLoading}
          // localeText={ptBR.props.MuiDataGrid.localeText}
          rows={row}
          getRowId={(row) => row[id]}
          columns={columns}
          disableSelectionOnClick
        />
      </div>
    );
  }
}

export default TableComponent;
