import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';

import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
export default class Pesquisar extends Component {
  render() {
    return (
      <List component="div" disablePadding>
        <Link to="/pesquisar/cliente">
          <ListItemButton>
            <ListItemIcon sx={{ marginLeft: 2 }}>
              <PersonIcon />
              <ListItemText primary="Cliente" sx={{ marginLeft: 1 }} />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Link to="/pesquisar/passeio">
          <ListItemButton>
            <ListItemIcon sx={{ marginLeft: 2 }}>
              <FlightTakeoffOutlinedIcon />
              <ListItemText primary="Passeio" sx={{ marginLeft: 1 }} />
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </List>
    );
  }
}
