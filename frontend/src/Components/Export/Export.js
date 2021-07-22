import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const Export = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const [startDate, setStartDate] = useState("2021-03-01");
  const onChangeStart = (e) => {
    setStartDate(e);
  };
  const [endDate, setEndDate] = useState("2021-07-01");
  const onChangeEnd = (e) => {
    setEndDate(e);
  };
  const [format, setFormat] = useState("CSV");
  const onChangeFormat = (e) => {
    setFormat(e.target.value);
  };
  return (
    <Container disableGutters maxWidth="xs" style={{ paddingTop: "1rem" }}>
      <Paper style={{ padding: "1rem" }}>
        <Typography variant="h2">Export As</Typography>
        <Divider />
        <form>
          <div style={{ padding: "0.5rem 0" }}>
            <TextField
              id="dataStart"
              label="start from"
              type="data"
              value={startDate}
              onChange={onChangeStart}
            />
          </div>
          <div style={{ padding: "0.5rem 0" }}>
            <TextField
              id="dataEnd"
              label="end"
              type="data"
              value={endDate}
              onChange={onChangeEnd}
            />
          </div>
          <FormControl style={{ padding: "0.8rem 0" }}>
            <FormLabel>Format</FormLabel>
            <Select label="Format" value={format} onChange={onChangeFormat}>
              <MenuItem value="CSV">CSV</MenuItem>
              <MenuItem value="Excel">Excel</MenuItem>
            </Select>
          </FormControl>
        </form>
        <Divider />
        <div style={{ padding: "0.8rem 0" }}>
          <Link
            style={{
              textDecoration: "initial",
              color: "initial",
            }}
            to="/"
          >
            <Button>Cancel</Button>
          </Link>
          <Button type="submit" onClick={onSubmit}>
            Ok
          </Button>
        </div>
      </Paper>
    </Container>
  );
};
export default Export;
