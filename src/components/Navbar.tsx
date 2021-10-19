import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme: Theme) =>
 createStyles({
 root: {
 flexGrow: 1,
 },
 menuButton: {
 marginRight: theme.spacing(2),
 },
 title: {
 flexGrow: 1,
 },
 small: {
 width: theme.spacing(3),
 height: theme.spacing(3),
 },
 }),
);
export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h5" className={classes.title}>
          ระบบบันทึกการชำระเงิน
          </Typography>
          <Button color="inherit">Logout</Button>
          <Grid item xs={1}>
          <Avatar src="/broken-image.jpg" className={classes.small}/>
          </Grid>
          <Grid item xs={1}>
          <p>เจ้าหน้าที่การเงิน</p>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
 }
 