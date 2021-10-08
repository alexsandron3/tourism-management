import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Relatorios from './partials/Relatorios';
import Cadastrar from './partials/Cadastrar';
import Pesquisar from './partials/Pesquisar';

const styles = () => ({
  list: {
    width: 200,
  },
});
class Appbar extends Component {
  constructor() {
    super();
    this.state = {
      appBarOpened: false,
      searchListOpened: false,
      registerListOpened: false,
      reportsListOpened: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(state, boolean) {
    this.setState({
      [state]: boolean,
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => this.handleClick('appBarOpened', true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">Fabio Passeios </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              edge="end"
              aria-label="usuario"
              arial-controls={1}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={this.state.appBarOpened}
          onClose={() => this.handleClick('appBarOpened', false)}
          onOpen={() => {}}
        >
          <Box textAlign="center" p={2} className={classes.list}>
            Menu
          </Box>
          <List>
            {/* Menu */}
            <ListItemButton>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Início" />
            </ListItemButton>

            {/* Register */}
            <ListItemButton
              onClick={() =>
                this.handleClick(
                  'registerListOpened',
                  !this.state.registerListOpened
                )
              }
            >
              <ListItemIcon>
                <AddBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Cadastrar" />
              {this.state.registerListOpened ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={this.state.registerListOpened}
              timeout="auto"
              unmountOnExit
            >
              <Cadastrar />
            </Collapse>

            {/* Search */}
            <ListItemButton
              onClick={() =>
                this.handleClick(
                  'searchListOpened',
                  !this.state.searchListOpened
                )
              }
            >
              <ListItemIcon>
                <SearchOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Pesquisar" />
              {this.state.searchListOpened ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={this.state.searchListOpened}
              timeout="auto"
              unmountOnExit
            >
              <Pesquisar />
            </Collapse>

            {/* Trips */}
            <ListItemButton>
              <ListItemIcon>
                <FlightTakeoffOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Lucros" />
            </ListItemButton>

            {/* Rela */}
            <ListItemButton
              onClick={() =>
                this.handleClick(
                  'reportsListOpened',
                  !this.state.reportsListOpened
                )
              }
            >
              <ListItemIcon>
                <WorkOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Relatórios" />
              {this.state.reportsListOpened ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={this.state.reportsListOpened}
              timeout="auto"
              unmountOnExit
            >
              <Relatorios />
            </Collapse>
          </List>
        </SwipeableDrawer>
      </div>
    );
  }
}
export default withStyles(styles)(Appbar);
