import React, { Component } from 'react';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PersonIcon from '@mui/icons-material/Person';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';

import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
export default class Cadastrar extends Component {
  render() {
    return (
      <List component="div" disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            <PersonIcon />
            <ListItemText primary="Cliente" sx={{ marginLeft: 1 }} />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            <FlightTakeoffOutlinedIcon />
            <ListItemText primary="Passeio" sx={{ marginLeft: 1 }} />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            <MoneyOffIcon />
            <ListItemText primary="Despesas" sx={{ marginLeft: 1 }} />
          </ListItemIcon>
        </ListItemButton>
      </List>
    );
  }
}
