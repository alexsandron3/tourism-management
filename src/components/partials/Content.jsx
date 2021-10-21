import { Grid, Typography, Card, CardContent } from '@mui/material';
import React, { Component } from 'react';
export default class Content extends Component {
  render() {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={10} mt={12} mb={6}>
          <Card elevation={24} p={6}>
            <CardContent>
              <Typography
                variant="h4"
                mt={4}
                textAlign="center"
                p={3}
                marginBottom={3}
              >
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
