import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  SwipeableDrawer,
  Box,
} from '@mui/material';
import { withStyles } from '@material-ui/styles';
import MenuIcon from '@mui/icons-material/Menu';

const styles = () => ({
  list: {
    width: 200,
  },
});
class Appbar extends Component {
  constructor() {
    super();
    this.state = {
      setOpen: false,
    };
    this.setOpen = this.setOpen.bind(this);
  }
  setOpen(boolean) {
    this.setState({
      setOpen: boolean,
    });
    console.log(this.state.setOpen);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => this.setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor="left"
          open={this.state.setOpen}
          onClose={() => this.setOpen(false)}
          onOpen={() => {}}
        >
          <Box textAlign="center" p={2} className={classes.list}>
            Components
          </Box>
        </SwipeableDrawer>
      </div>
    );
  }
}
export default withStyles(styles)(Appbar);
