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

class TableComponent extends Component {
  render() {
    const { columns, row, id, isLoading, CustomToolbar, CustomLoadingOverlay } =
      this.props;
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          components={{
            Toolbar: CustomToolbar,
            LoadingOverlay: CustomLoadingOverlay,
          }}
          loading={isLoading}
          localeText={ptBR.props.MuiDataGrid.localeText}
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
