import React from "react";
import { AddExercisesForm } from "../components/AddExercisesForm/AddExercisesForm";
import Paper from '@mui/material/Paper';

export const ExercisesView = () => {
    return (
        <Paper
            sx={{
                padding: 4,
                margin: 3,
            }}
        >
            <AddExercisesForm />
        </Paper>
    )
}