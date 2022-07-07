import React from "react";
import { TrainigList } from "../components/TrainingList/TraingList";
import Paper from '@mui/material/Paper';

export const TrainigListView = () => {
    return (
        <Paper
            sx={{
                padding: 4,
                margin: 3,
            }}
        >
            <TrainigList />
        </Paper>
    )
}