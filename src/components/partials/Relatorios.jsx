import React, { Component } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CakeIcon from '@mui/icons-material/Cake';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export default class Relatorios extends Component {
  render() {
    return (
      <List component="div" disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            <CakeIcon />
            <ListItemText
              primary="Aniversariantes do mês"
              sx={{ marginLeft: 1 }}
            />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            <InfoIcon />
            <ListItemText primary="Logs" sx={{ marginLeft: 1 }} />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            <MoneyOffIcon />
            <ListItemText
              primary="Pagamentos Pendentes"
              sx={{ marginLeft: 1 }}
            />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            <AttachMoneyIcon />
            <ListItemText
              primary="Pagamentos Realizados"
              sx={{ marginLeft: 1 }}
            />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            {/* <AttachMoneyIcon /> */}
            <ListItemText
              primary="Relatório Periódico de Vendas"
              sx={{ marginLeft: 1 }}
            />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            {/* <AttachMoneyIcon /> */}
            <ListItemText
              primary="Relatório de Vendas"
              sx={{ marginLeft: 1 }}
            />
          </ListItemIcon>
        </ListItemButton>
      </List>
    );
  }
}
