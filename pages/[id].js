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
import { Description } from '@mui/icons-material'

export default function MovieDetail() {
  const router = useRouter()
  const id = router.query.id

  const [value, setValue] = useState()
  const [theatre, setTheatre] = useState()
  const [time, setTime] = useState()
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
          height: '200vh',
          minHeight: '100%',
        }}
      >
        <Stack direction="row">
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
        <Stack direction="row" gap={6}>
          <Stack>
            <img
              src={data.image}
              style={{
                width: 250,
                height: 350,
                borderRadius: 10,
              }}
            />
          </Stack>
          <Stack>
            <Stack p={1}>
              <Typography sx={{ color: '#f1ad3f' }}>{dayjs(data.date).format('DD MMM YYYY')}</Typography>
            </Stack>
            <Stack p={1}>
              <Typography>{data[router.locale]}</Typography>
            </Stack>
            <Stack p={1}>
              <Typography>{data[`${router.locale}Description`]}</Typography>
            </Stack>
            <Stack p={2}>
              <Stack direction="row" gap={1}>
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
        <Stack direction="row" justifyContent="space-around" marginTop={4} marginBottom={2}>
          <ButtonGroup fullWidth size="large" aria-label="large button group">
            <Button
              sx={{ borderColor: '#D9D9D9', color: '#000000', backgroundColor: '#FFFFFF', textTransform: 'none' }}
            >
              Select Show time
            </Button>
            <Button
              sx={{
                borderColor: '#D9D9D9',
                color: theatre ? '#000000' : '#ffff',
                backgroundColor: theatre ? '#ffff' : '#0000000',
                textTransform: 'none',
              }}
            >
              Select Seats
            </Button>
            <Button
              sx={{
                borderColor: '#D9D9D9',
                color: '#ffff',
                textTransform: 'none',
              }}
            >
              Buy
            </Button>
          </ButtonGroup>
        </Stack>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
          <Stack>
            <Stack flexWrap="wrap" alignContent="center" m={1}>
              Select Date
            </Stack>
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: 250,
                    borderColor: '#FFFF',
                    color: '#FFFF',
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
            <Stack flexWrap="wrap" alignContent="center" m={1}>
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
                  color: '#FFFFFF',
                }}
              >
                <MenuItem value="theatre1">Theatre1</MenuItem>
                <MenuItem value="theatre2">Theatre2</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack>
            <Stack flexWrap="wrap" alignContent="center" m={1}>
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
                  color: '#FFFFFF',
                }}
              >
                <MenuItem value={'11:00'}>11:00</MenuItem>
                <MenuItem value={'11:30'}>11:30</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack sx={{ display: time === undefined || theatre === undefined || value === undefined ? 'none' : '' }}>
          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              background: '#D1A154',
              fontSize: 25,
            }}
            marginTop={6}
          >
            <Typography>SCREEN</Typography>
          </Stack>

          <Stack m={2}>
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
          <Stack direction="row" justifyContent="center" m={1}>
            <Typography>SUMMARY</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-evenly"
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
              <img
                src={data.image}
                style={{
                  width: 150,
                  borderRadius: 10,
                }}
              />
            </Stack>
            <Stack justifyContent="center">
              <Stack direction="row" justifyContent="space-between">
                <Stack p={1}>
                  <Typography>{data.en}</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" gap={1}>
                <Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack p={1}>Show Time</Stack>
                    <Stack p={1}>Date : {value ? dayjs(new Date(value)).format('DD/MM/YYYY') : '-'}</Stack>
                    <Stack p={1}>Theatre : {theatre ? theatre : '-'}</Stack>
                  </Stack>
                  <Stack flexWrap="wrap" p={1}>
                    Seats: {seats.length > 0 ? seats.sort() + ',' : '-'}
                  </Stack>
                </Stack>
                <Stack direction="column">
                  <Stack p={1}>Time: {time ? time : '-'}</Stack>
                  <Stack p={1}>Total Price: {seats ? seats.length * 300 : '-'}</Stack>
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
      </Stack>
    </Layout>
  )
}
