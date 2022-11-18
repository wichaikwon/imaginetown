import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import useAxios from "axios-hooks";
import styled from "@mui/system/styled";
import Chip from "@mui/material/Chip";
import { useState } from "react";

const MovieTitle = styled(Typography)({
  color: "#F1AD3F",
  fontWeight: 700,
  fontSize: 14,
});
const Dresciption = styled(Typography)({
  color: "#FFFFFF",
  fontWeight: 700,
  fontSize: 18,
});

export default function Home() {
  const [state, setState] = useState("NOW_SHOWING");

  const [{ data, loading, error }, refetch] = useAxios(
    "https://imaginetown.vercel.app/api"
  );
  if (loading) return <p>loding...</p>;
  if (error) return <p>Error...</p>;

  return (
    <Box
      height="200vh"
      sx={{
        background:
          "linear-gradient(123.95deg, rgba(0, 0, 0, 0.9) 12.92%, rgba(131, 0, 0, 0.9) 87%)",
      }}
    >
      <AppBar position="sticky">
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Toolbar>test</Toolbar>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              imagineTown
            </Typography>
          </Toolbar>
          <Toolbar>
            Cart <a>&nbsp;Login</a>
          </Toolbar>
        </Stack>
      </AppBar>
      <Container>
        <Stack p={3}
          sx={{
            backgroundColor: "#FFFFFF1A",
          }}
        >
          <Stack direction="row" gap={1} justifyContent="center">
            <Button
              onClick={() => setState("NOW_SHOWING")}
              sx={{
                color: state === "NOW_SHOWING" ? "#FFFF" : "#FFFFFF50",
                fontWeight: 700,
                fontSize: 20,
                textTransform: "none",
              }}
            >
              Now Showing
            </Button>
            <Button
              onClick={() => setState("COMING_SOON")}
              sx={{
                // color: t => t.palette.common.white,
                color: state === "COMING_SOON" ? "#FFFF" : "#FFFFFF50",
                fontWeight: 700,
                fontSize: 20,
                textTransform: "none",
              }}
            >
              Coming Soon
            </Button>
          </Stack>
          <Box>
            <Stack
              direction="row"
              gap={4}
              justifyContent="center"
              flexWrap="wrap"
            >
              {data[state].map((idx) => {
                return (
                  <Stack 
                  width={250} 
                  key={idx.id}>
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
                      <MovieTitle>{idx.date}</MovieTitle>
                    </Stack>
                    <Stack>
                      <Dresciption>{idx.name.en}</Dresciption>
                    </Stack>
                    <Stack>
                      <Dresciption>{idx.name.th}</Dresciption>
                    </Stack>
                    <Stack direction="row" gap={1}>
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
                );
              })}
              <Stack></Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
