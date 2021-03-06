import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UsersInterface } from "../models/IUser";
import { TreatmentInterface } from "../models/ITreatment";
import { PatientInterface } from "../models/IPatient";
import { PaymentInterface } from "../models/IPayment";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useEffect } from "react";
import { FormControl, Select } from "@material-ui/core";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
function Alert(props: AlertProps): JSX.Element {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { flexGrow: 1 },
    container: { marginTop: theme.spacing(2) },
    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
    table: { minWidth: 20 }
  }));
export default function Body() {
  const [detail, setDetail] = React.useState<String>();
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof pats
    console.log("Name", name)
    setAppoint({
      ...pats,
      [name]: event.target.value,
    });
  };
  //ดึงข้อมูลผู้ป่วย
  const [patients, setPatient] = React.useState<PatientInterface[]>([]);
  function getPatient() {
    const apiUrl = "http://localhost:8080/patients";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Combobox_patient", res)
        if (res.data) {
          setPatient(res.data);
        } else {
          console.log("else");
        }
      });
  }
  //ดึงข้อมูลแพทย์
  const [users, setUser] = React.useState<UsersInterface[]>([]);
  function getUser() {
    const apiUrl = "http://localhost:8080/users";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Combobox_User", res)
        if (res.data) {
          setUser(res.data);
        } else {
          console.log("else");
        }
      });
  }
  //ดึงข้อมูลเหตุที่นัด
  const [treatmentt, setTreatment] = React.useState<TreatmentInterface[]>([]);
  function gettreatment() {
    const apiUrl = "http://localhost:8080/treatments";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Combobox_treatment", res)
        if (res.data) {
          setTreatment(res.data);
        } else {
          console.log("else");
        }
      });
  }
  //ดึงข้อมูล ใส่ combobox
  useEffect(() => {
    getPatient();
    getUser();
    gettreatment();
  }, []);
  const [AddedTime, setAddedTime] = React.useState<Date | null>(new Date());
  const handleAddedTime = (date: Date | null) => {
    setAddedTime(date);
  }
  //สร้างข้อมูล
  const [pats, setAppoint] = React.useState<Partial<PaymentInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Body;
    const { value } = event.target;
    console.log("Value", value)
    console.log("ID", id)
    setAppoint({ ...pats, [id]: value });
  };
  const [ErrorMessage, setErrorMessage] = React.useState<String>();
  function submit() {
    let data = {
      PatientID: typeof pats.ID === "string" ? parseInt(pats.ID) : NaN,
      UserID: typeof pats.ID === "string" ? parseInt(pats.ID) : 1,
      TreatmentID: typeof pats.ID === "string" ? parseInt(pats.ID) : NaN,
      Todo: pats.note ?? "",
      AppointTime: AddedTime
    };
    console.log("Data", data)
    const apiUrl = "http://localhost:8080/payments";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Res", res)
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true)
        }
      });
  }
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex"> <Box flexGrow={1}>

        </Box>
          <Typography
            component="h2"
            variant="h5"
            color="primary"
            gutterBottom
          >
            การชำระเงิน
            
          </Typography>
        
        </Box>
      <Divider />
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined" style={{ width: 425 }}>
            <p>ชื่อผู้ป่วย</p>
            <Select
              native
              value={pats.PatientID}
              onChange={handleChange}
              inputProps={{
                name: "PatientID",
              }}
            >
            
            <option aria-label="None" value="" >
            </option>
            {patients.map((item: PatientInterface) => (
              <option value={item.ID} key={item.ID}>
                {item.PatientName}
              </option>
            ))}
           </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" style={{ width: 425 }}>
          <p>ผู้รับเงิน</p>
          <Select
            native
            value={pats.UserID}
            onChange={handleChange}
            inputProps={{
              name: "UserID",
            }}
          >
            <option aria-label="None" value="" >
            </option>
            {users.map((item: UsersInterface) => (
              <option value={item.ID} key={item.ID}>
                {item.UserName}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" style={{ width: 425 }}>
          <p>อาการ</p>
          <Select
            native
            value={pats.ID}
            onChange={handleChange}
            inputProps={{
              name: "ID",
            }}
          >
            <option aria-label="None" value="" >
            </option>
            {treatmentt.map((item: TreatmentInterface) => (
              <option value={item.ID} key={item.ID}>
                {item.Name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} >
        <p>หมายเหตุ</p>
        <TextField style={{ width: 425 }}
          inputProps={{
            name: "note",
          }}
          value={pats.note}
          id="note"
          label=""
          variant="outlined"
          type="string"
          size="medium"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl style={{ float: "right", width: 400, marginRight: 27 }} variant="outlined">
          <p>วันและเวลาที่จ่าย</p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              name="PayTime"
              value={AddedTime}
              onChange={handleAddedTime}
              minDate={new Date("2018-01-01T00:00")}
              format="yyyy/MM/dd hh:mm a"
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <Grid item xs={6} >
        <p>ราคา</p>
        <TextField style={{ width: 425 }}
          inputProps={{
            name: "note",
          }}
          value={pats.price}
          id="note"
          label=""
          variant="outlined"
          type="string"
          size="medium"
          onChange={handleChange}
        />
      </Grid>
      </Grid>
      
      <Grid item xs={12}>
        <Button style={{ float: "right" }}
          variant="contained"
          color="primary"
          onClick={submit} >
          บันทึก
        </Button>
      </Grid>
      <Button style={{ float: "right" }}
              component={RouterLink}
              to="/back"
              variant="contained"
              color="primary">
              ประวัติการชำระเงิน
            </Button>
    </Grid>
</Paper >
</Container >
)
}
