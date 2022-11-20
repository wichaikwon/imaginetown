import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useAxios from "axios-hooks";
import styled from "@mui/system/styled";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Layout from "./layout/layout";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function MovieDetail() {
  const router = useRouter();
  const id = router.query.id;
  const [value, setValue] = useState(null);
  const [{ data, loading, error }, refetch] = useAxios(
    `http://localhost:3000/api/${id}`
  );
  if (loading) return <p>loding...</p>;
  if (error) return <p>Error...</p>;

  return (
    <Layout>
      <Stack
        p={3}
        sx={{
          backgroundColor: "#FFFFFF1A",
          color: "#FFFF",
          height: "150vh",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          {/* stack back button */}
          <Button
            href="/"
            sx={{
              color: "#ffff",
              textTransform: "none",
            }}
          >
            <KeyboardArrowLeftIcon />
            Back
          </Button>
        </Stack>
        <Stack>
          {data.map((idx) => {
            return (
              <Stack direction="row" gap={6} key={idx.id}>
                <Stack>
                  <img
                    src={idx.image}
                    style={{
                      width: 250,
                      height: 300,
                      borderRadius: 10,
                    }}
                  />
                </Stack>
                <Stack>
                  <Stack>
                    <Typography sx={{ color: "#f1ad3f" }}>
                      {idx.date}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography>{idx.name.en}</Typography>
                  </Stack>
                  <Stack>
                    <Typography>{idx.description.en}</Typography>
                  </Stack>
                  <Stack direction="row">
                    <Chip
                      sx={{
                        background: "#E1E1E7",
                        borderRadius: 10,
                        color: "#838388",
                      }}
                      label={idx.type}
                    />
                    <Chip
                      sx={{
                        background: "#E1E1E7",
                        borderRadius: 10,
                        color: "#838388",
                      }}
                      label={idx.duration}
                    />
                  </Stack>
                </Stack>
              </Stack>
            )
          })}
        </Stack>
        <Stack direction="row" justifyContent="space-around" m={5} border={1}>
          <Stack>
            <Typography>select</Typography>
          </Stack>
          <Stack>
            <Typography>seat</Typography>
          </Stack>
          <Stack>
            <Typography>buy</Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={4}
          justifyContent="space-between">
          <Stack>
            <Stack flexWrap="wrap" alignContent="center">
              Select Date
            </Stack>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
          <Stack>
            <Stack flexWrap="wrap" alignContent="center">
              Select Date
            </Stack>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
          <Stack>
            <Stack flexWrap="wrap" alignContent="center">
              Select Date
            </Stack>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}
