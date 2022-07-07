import React from "react";
import { AddTrainingForm } from "../components/AddTrainigForm/AddTrainingForm";
import Paper from '@mui/material/Paper';

export const AddTrainingView = () => {
    return (
        <Paper
            sx={{
                padding: 4,
                margin: 3,
            }}
        >
            <AddTrainingForm />
        </Paper>
    )
}