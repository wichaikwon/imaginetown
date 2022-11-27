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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Layout = ({ children }) => {
    return (
        <Box
            height="200vh"
            minHeight="100%"
            sx={{
                background:
                    "linear-gradient(123.95deg, rgba(0, 0, 0, 0.9) 12.92%, rgba(131, 0, 0, 0.9) 87%)",

            }}
        >
            <AppBar position="sticky"
                sx={{
                    background: 'rgba(0, 0, 0, 0.95)'
                }}>
                <Container>
                    <Stack direction="row" height={50} justifyContent="space-between">
                        <Stack justifyContent="center">
                            <Typography>
                                MY CinePlex
                            </Typography>
                        </Stack>
                        <Stack justifyContent="center">
                            <Stack direction="row" >
                                <Typography>
                                    EN
                                </Typography>
                                <KeyboardArrowDownIcon/>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </AppBar>
            <Container>
                {children}
            </Container>
        </Box>
    )
}
export default Layout