import React, { Component } from 'react';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PersonIcon from '@mui/icons-material/Person';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import { Link } from 'react-router-dom';

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
        <Link to="/cadastrar/cliente">
          <ListItemButton>
            <ListItemIcon sx={{ marginLeft: 2 }}>
              <PersonIcon />
              <ListItemText primary="Cliente" sx={{ marginLeft: 1 }} />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Link to="/cadastrar/passeio">
          <ListItemButton>
            <ListItemIcon sx={{ marginLeft: 2 }}>
              <FlightTakeoffOutlinedIcon />
              <ListItemText primary="Passeio" sx={{ marginLeft: 1 }} />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Link to="/cadastrar/despesa">
          <ListItemButton>
            <ListItemIcon sx={{ marginLeft: 2 }}>
              <MoneyOffIcon />
              <ListItemText primary="Despesas" sx={{ marginLeft: 1 }} />
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </List>
    );
  }
}
