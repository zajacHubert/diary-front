import { Typography } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TrainigToAdd } from "types";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export const SingleTrainigView = () => {
    const { date, title } = useParams();
    console.log(date)
    const [singleTraining, setSingleTraining] = useState<TrainigToAdd[] | null>(null);


    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/training/${date}/${title}`)
            const data = await res.json();
            setSingleTraining(data)
            console.log(data)

        })()
    }, [])





    if (singleTraining === null) {
        return <p>Loading...</p>
    }

    return (

        <Paper
            sx={{
                padding: 4,
                margin: 3,
            }}
        >
            <Typography
                variant="h3"
                align='center'
                style={{
                    marginBottom: 10,
                }}

            >{title} {date}</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Liczba ćwiczeń</StyledTableCell>
                            <StyledTableCell align="left">Nazwa ćwiczenia</StyledTableCell>
                            <StyledTableCell align="left">Liczba powtórzeń w seriach</StyledTableCell>
                            <StyledTableCell align="center">Ciężary [kg]</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {singleTraining.map((row, i) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {i + 1}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.exerciseName}</StyledTableCell>
                                <StyledTableCell align="left">{row.reps}</StyledTableCell>
                                <StyledTableCell
                                    align="center">{row.weights}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>

    )
}