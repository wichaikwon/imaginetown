import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useAxios from "axios-hooks";
import styled from "@mui/system/styled";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { useRouter } from 'next/router'
import Layout from "./layout/layout";
import dayjs from 'dayjs'

const MovieTitle = styled(Typography)({
  color: "#F1AD3F",
  fontWeight: 700,
  fontSize: 14,
});
const Name = styled(Typography)({
  color: "#FFFFFF",
  fontWeight: 700,
  fontSize: 18,
});

export default function Home() {
  const [state, setState] = useState("NOW_SHOWING");
  const router = useRouter()
  const id = router.query.id
  // const [lang, setLang] = useState('');

  const [{ data, loading, error }, refetch] = useAxios(
    "http://localhost:3000/api"
  );
  if (loading) return <p>loding...</p>;
  if (error) return <p>Error...</p>;

  return (
    <Layout>
      <Stack
        p={3}
        sx={{
          backgroundColor: "#FFFFFF1A",
        }}>
        <Stack direction="row" p={2} justifyContent="center">
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
        <Stack>
          <Stack direction="row" gap={4} flexWrap="wrap">
            {data[state].map((idx) => {
              return (
                <Stack width={250} key={idx.id}>
                  <Stack>
                    <a href={`/${idx.id}`}>
                      <img
                        src={idx.image}
                        style={{
                          width: 250,
                          height: 300,
                          borderRadius: 10,
                        }}
                      />
                    </a>
                  </Stack>
                  <Stack marginTop={1} marginBottom={1}>
                    <MovieTitle>{dayjs(idx.date).format()}</MovieTitle>
                  </Stack>
                  <Stack>
                    <Name>{idx.en}</Name>
                  </Stack>
                  <Stack>
                    {/* <Name>{idx.name.th}</Name> */}
                  </Stack>
                  <Stack marginTop={1}>
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
                </Stack>
              );
            })}
            <Stack></Stack>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
}
