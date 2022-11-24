import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import useAxios from 'axios-hooks'
import styled from '@mui/system/styled'
import Chip from '@mui/material/Chip'
import { useState } from 'react'
import { useRouter } from 'next/router'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Layout from './layout/layout'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ButtonGroup, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import ChairIcon from '@mui/icons-material/Chair'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function MovieDetail() {
  const router = useRouter()
  const id = router.query.id

  const [value, setValue] = useState()
  const [theatre, setTheatre] = useState()
  const [time, setTime] = useState()
  // const [isClick, setIsClick] = useState()

  const [seats, setSeats] = useState([])

  const handleChangeTime = (e) => {
    const value = e.target.value
    setTime(value)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setTheatre(value)
  }

  const handleClick = (seat) => {
    let chairs = []
    if (!seats.includes(seat)) {
      chairs = [...seats]
      chairs.push(seat)
      setSeats(chairs)
    } else {
      seats.filter((check) => {
        if (check !== seat) {
          chairs.push(check)
          setSeats(chairs)
        }
      })
    }
    setSeats(chairs)
  }
  const [{ data, loading, error }, refetch] = useAxios(`http://localhost:3000/api/${id}`)
  if (loading) return <p>loding...</p>
  if (error) return <p>Error...</p>

  const { id: mId, reserved } = data
  return (
    <Layout>
      <Stack
        p={3}
        sx={{
          backgroundColor: '#FFFFFF1A',
          color: '#FFFF',
          height: '100vh',
          minHeight: '100%',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Button
            href="/"
            sx={{
              color: '#ffff',
              textTransform: 'none',
            }}
          >
            <KeyboardArrowLeftIcon />
            Back
          </Button>
        </Stack>
        <Stack>
          <Stack direction="row" gap={6}>
            <Stack>
              <img
                src={data.image}
                style={{
                  width: 250,
                  height: 300,
                  borderRadius: 10,
                }}
              />
            </Stack>
            <Stack>
              <Stack>
                <Typography sx={{ color: '#f1ad3f' }}>{data.date}</Typography>
              </Stack>
              <Stack>{/* <Typography>{data.name.th}</Typography> */}</Stack>
              <Stack>{/* <Typography>{data.description.en}</Typography> */}</Stack>
              <Stack direction="row">
                <Chip
                  sx={{
                    background: '#E1E1E7',
                    borderRadius: 10,
                    color: '#838388',
                  }}
                  label={data.type}
                />
                <Chip
                  sx={{
                    background: '#E1E1E7',
                    borderRadius: 10,
                    color: '#838388',
                  }}
                  label={data.duration}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-around" marginBottom={5}>
          <ButtonGroup
            variant=""
            fullWidth
            aria-label="outlined button group"
            sx={{
              border: 1,
              borderRadius: 10,
            }}
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={4} justifyContent="space-between">
          <Stack>
            <Stack flexWrap="wrap" alignContent="center">
              Select Date
            </Stack>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: 250,
                    color: '#FFFFFF',
                  }}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
          <Stack>
            <Stack flexWrap="wrap" alignContent="center">
              Select Theatre
            </Stack>
            <FormControl fullWidth>
              <InputLabel id="select-theatre"></InputLabel>
              <Select
                labelId="select-theatre"
                id="demo-simple-select"
                value={theatre}
                onChange={handleChange}
                sx={{
                  width: 250,
                }}
              >
                <MenuItem value={'theatre1'}>Theatre1</MenuItem>
                <MenuItem value={'theatre2'}>Theatre2</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack>
            <Stack flexWrap="wrap" alignContent="center">
              Select Time
            </Stack>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={time}
                onChange={handleChangeTime}
                sx={{
                  width: 250,
                }}
              >
                <MenuItem value={'11:00'}>11:00</MenuItem>
                <MenuItem value={'11:30'}>11:30</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignContent="center"
          justifyContent="center"
          sx={{
            background: '#D1A154',
            fontSize: 25,
            height: 30,
          }}
        >
          <Typography>SCREEN</Typography>
        </Stack>

        <Stack p={4}>
          {['E', 'D', 'C', 'B', 'A'].map((row) => {
            return (
              <Stack key={row}>
                <Stack direction="row" gap={3} justifyContent="center" alignItems="center">
                  <Stack>
                    <Typography sx={{ fontWeight: 600 }}>{row}</Typography>
                  </Stack>
                  <Stack direction="row">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col) => {
                      let colrow = `${row}${col}`
                      let available = ''
                      seats.forEach((seat) => {
                        if (seat === colrow) return (available = seat === colrow)
                      })
                      return (
                        <Stack key={col}>
                          <Button onClick={() => handleClick(colrow)}>
                            {/*
                              avaliable ? checked ? checked : green : red
                             */}

                            {available ? (
                              <CheckCircleIcon sx={{ color: '#D1A154', fontSize: 24 }} />
                            ) : (
                              <ChairIcon sx={{ color: '#3B8824', fontSize: 32 }} />
                            )}
                          </Button>
                        </Stack>
                      )
                    })}
                  </Stack>
                  <Stack>
                    <Typography sx={{ fontWeight: 600 }}>{row}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            )
          })}
        </Stack>
        <Stack>
          <Divider color="#D9D9D9"></Divider>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Typography>SUMMARY</Typography>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          justifyContent="space-between"
          sx={{
            border: 1,
            borderRadius: 10,
          }}
          p={3}
        >
          <Stack
            sx={{
              borderRadius: 10,
            }}
          >
            <img src={data.image} width={150} />
          </Stack>
          <Stack justifyContent="center">
            <Stack direction="row" gap={1} justifyContent="space-between">
              {/* <Stack>{data.name.en}</Stack> */}
            </Stack>
            <Stack direction="row" gap={1}>
              <Stack>
                <Stack direction="row" gap={4} justifyContent="space-between">
                  <Stack>Show Time</Stack>
                  <Stack>Date : {value ? dayjs(new Date(value)).format('DD/MM/YYYY') : '-'}</Stack>
                  <Stack>Theatre : {theatre ? theatre : '-'}</Stack>
                </Stack>
                <Stack>Seats: -</Stack>
              </Stack>
              <Stack direction="column">
                <Stack>Time: {time ? time : '-'}</Stack>
                <Stack>Total Price: -</Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack justifyContent="center">
            <Button
              sx={{
                border: 1,
                borderRadius: 3,
                width: 200,
                color: '#FFFF',
              }}
            >
              Buy now
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}
