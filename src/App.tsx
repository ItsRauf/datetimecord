import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "@material-ui/lab/DateTimePicker";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

function App() {
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [format, setFormat] = useState("f");
  const [output, setOutput] = useState("");

  const displayFormats: Record<string, string> = {
    t: "LT",
    T: "LTS",
    d: "L",
    D: "LL",
    f: "LLL",
    F: "LLLL",
  };

  const getDisplay = () => {
    if (date) {
      if (format === "R") {
        return date.fromNow();
      } else {
        return date.format(displayFormats[format]);
      }
    }
  };

  useEffect(() => {
    if (date) {
      setOutput(`<t:${date.unix()}:${format}>`);
    } else {
      setOutput("");
    }
  }, [date, format]);

  const changeFormat = (event: React.ChangeEvent<{ value: string }>) => {
    setFormat(event.target.value);
  };

  return (
    <Container sx={{ height: "100vh" }} fixed>
      <Grid
        container
        sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs={12} md={8} lg={6}>
          <Card>
            <CardContent>
              <Grid
                container
                direction="column"
                spacing={4}
                sx={{
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "15px",
                }}
              >
                <Grid item>
                  <Typography variant="h6" gutterBottom component="h6">
                    DateTimeCord
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom component="p">
                    Helper Tool for Date and Time formatting in Discord
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    spacing={4}
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid item xs={7}>
                      <DateTimePicker
                        renderInput={(props) => (
                          <TextField {...props} helperText="" />
                        )}
                        label="Date & Time"
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl fullWidth>
                        <InputLabel id="datetimecord-format">Format</InputLabel>
                        <Select
                          labelId="datetimecord-format"
                          id="datetimecord-format"
                          value={format}
                          label="Format"
                          onChange={changeFormat}
                        >
                          <MenuItem value="t">Short Time</MenuItem>
                          <MenuItem value="T">Long Time</MenuItem>
                          <MenuItem value="d">Short Date</MenuItem>
                          <MenuItem value="D">Long Date</MenuItem>
                          <MenuItem value="f">Short Date/Time</MenuItem>
                          <MenuItem value="F">Long Date/Time</MenuItem>
                          <MenuItem value="R">Relative Time</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{ padding: "16px", marginRight: "8px" }}
                  >
                    <Typography variant="subtitle1" component="p">
                      {getDisplay()}
                    </Typography>
                  </Paper>
                  <Paper elevation={3} sx={{ padding: "16px" }}>
                    <Typography variant="subtitle1" component="p">
                      {output}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
