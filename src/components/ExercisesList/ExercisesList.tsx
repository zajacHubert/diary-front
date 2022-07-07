import React from "react";
import { ExerciseToAddToList } from "types";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { IconButton, ListItemText } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
    exercises: ExerciseToAddToList[] | null;
    removeExerciseHandler: (id: string) => void;
}

export const ExercisesList = ({ exercises, removeExerciseHandler }: Props) => {

    if (exercises === null) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Typography variant="h4" sx={{ marginTop: 5, marginBottom: 5 }}>Zapisane ćwiczenia</Typography>

            <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', maxHeight: 500, overflow: 'auto' }}>
                <List>

                    {exercises.map(item => (
                        <ListItem disablePadding key={item.id}>
                            <ListItemButton>
                                <ListItemText primary={item.exerciseName} />
                                <IconButton onClick={() => removeExerciseHandler(item.id)}><DeleteIcon /></IconButton>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );

}