import { Grid, Typography, Card, CardContent } from '@mui/material';
import React, { Component } from 'react';
export default class Content extends Component {
  render() {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={10} p={3}>
          <Card elevation={2} p={6}>
            <CardContent>
              <Typography variant="h4" mt={4} textAlign="center" >
                {this.props.cardTitle}
              </Typography>
              {this.props.children}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
