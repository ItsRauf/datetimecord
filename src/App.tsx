import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { DatePicker, TimePicker } from "@mui/lab";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TooltipButton from "./TooltipButton";

function App() {
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);

  const displayFormats: Record<string, string[]> = {
    t: ["Short Time", "LT"],
    T: ["Long Time", "LTS"],
    d: ["Short Date", "L"],
    D: ["Long Date", "LL"],
    f: ["Short Date/Time", "LLL"],
    F: ["Long Date/Time", "LLLL"],
  };

  const [date, setDate] = useState<Dayjs | null>(dayjs().set("seconds", 0));

  const discordFormat = (key: string) => {
    return `<t:${date!.unix()}:${key}>`;
  };

  const copyText = (key: string) => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(discordFormat(key));
    } else {
      document.execCommand("copy", true, discordFormat(key));
    }
  };

  return (
    <Container sx={{ height: "100vh", padding: [4] }} fixed>
      <Grid
        container
        direction={{ xs: "row", sm: "column" }}
        sx={{ height: "100%" }}
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Typography variant="h6" gutterBottom component="h6">
            DateTimeCord
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="p">
            Helper Tool for Date and Time formatting in Discord
          </Typography>
        </Grid>
        <Grid
          container
          item
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <DatePicker
              renderInput={(props) => <TextField {...props} />}
              label="Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </Grid>
          <Grid item>
            <TimePicker
              inputFormat="LTS"
              views={["hours", "minutes", "seconds"]}
              renderInput={(props) => <TextField {...props} />}
              label="Time"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" alignItems="center">
          <TableContainer component={Paper}>
            <Table aria-label="DateTimeCord Table">
              <TableHead>
                <TableRow>
                  <TableCell>Format</TableCell>
                  <TableCell>Syntax</TableCell>
                  <TableCell>Example</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(displayFormats).map(([key, fmt]) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {fmt[0]}
                    </TableCell>
                    <TableCell>
                      <TooltipButton
                        btnText={discordFormat(key)}
                        onClick={() => copyText(key)}
                      />
                    </TableCell>
                    <TableCell>{date!.format(fmt[1])}</TableCell>
                  </TableRow>
                ))}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Relative Time
                  </TableCell>
                  <TableCell>
                    <TooltipButton
                      btnText={discordFormat("R")}
                      onClick={() => copyText("R")}
                    />
                  </TableCell>
                  <TableCell>{date!.fromNow()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
