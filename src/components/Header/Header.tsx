import React from "react";
import { NavLink } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export const Header = () => {

    return (
        <>
            <Paper
                sx={{
                    padding: 2,
                    margin: 3,
                    marginTop: 5,
                }}
            >
                <Typography
                    variant="h1"
                    align="center"
                    style={{ fontWeight: 700, marginTop: 8, fontSize: '5.5rem' }}
                    textTransform='uppercase'
                >
                    Dziennik treningowy
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        justifyContent="space-around"
                        container
                        spacing={4}
                        sx={{
                            padding: 3,

                        }}
                    >
                        <Grid
                            item
                            xs={3}
                        >
                            <NavLink to='/training/add-form' style={{ textDecoration: 'inherit' }}>
                                <Button
                                    variant="contained"
                                    size='large'
                                >
                                    Dodaj trening
                                </Button>
                            </NavLink>
                        </Grid>

                        <Grid item xs={4}>
                            <NavLink to='/training' style={{ textDecoration: 'inherit' }}>
                                <Button
                                    variant="contained"
                                    size='large'
                                >
                                    Pokaż zapisane treningi
                                </Button>
                            </NavLink>
                        </Grid>

                        <Grid item xs={3}>
                            <NavLink to='/exercise' style={{ textDecoration: 'inherit' }}>
                                <Button
                                    variant="contained"
                                    size='large'
                                >
                                    Pokaż ćwiczenia
                                </Button>
                            </NavLink>
                        </Grid>

                    </Grid>
                </Box>
            </Paper>

        </>
    )
}