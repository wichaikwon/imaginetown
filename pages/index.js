import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import useAxios from 'axios-hooks'

export default function Home() {
  const [{ data, loading, error }, refetch] = useAxios(
    'http://localhost:5555/'
  )
  if (loading) return <p>loding...</p>
  if (error) return <p>Error...</p>
console.log(data)

  return (
    <Box height="200vh"
      sx={{
        background: "linear-gradient(123.95deg, rgba(0, 0, 0, 0.9) 12.92%, rgba(131, 0, 0, 0.9) 87%)"
      }}>

      <AppBar position='sticky'>
        <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">

          <Toolbar></Toolbar>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              imagineTown
            </Typography>
          </Toolbar>
          <Toolbar>Cart <a>&nbsp;Login</a></Toolbar>
        </Stack>
      </AppBar>
      <Container
        sx={{
          color: 'white'
        }}>
        <Box>
          <Stack direction="row" gap={1} justifyContent="center">
            <p>Now Showing</p>
            <p>Coming Soon</p>
          </Stack>
        </Box>
        <Box>
          <Stack direction="row" gap={1} justifyContent="center">
            {data.Now_Showing.map(idx => {
              return (
                <Stack key={idx.id}>
                  <img src={idx.image} />
                  <p>{idx.NameTH}</p>
                  <p>{idx.NameEN}</p>
                  <p>{idx.Date}</p>
                  <p>{idx.Type}</p>
                  <p>{idx.Duration}</p>
                </Stack>
              )
            })}
            <Stack>test git</Stack>
            <Stack>test git</Stack>
            <Stack>test git</Stack>
            <Stack>test git</Stack>
            <Stack>test git</Stack>
            <Stack>test git</Stack>
          </Stack>
          <Stack direction="row" gap={1} justifyContent="center">
            <Button variant="contained">Cate</Button>
            <Button variant="contained">hours</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
