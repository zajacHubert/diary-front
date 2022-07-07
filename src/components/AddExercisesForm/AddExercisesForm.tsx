import React, { useState, FormEvent, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { ExercisesList } from "../ExercisesList/ExercisesList";
import { ExerciseToAddToList } from "types";


const useStyles = makeStyles({
    root: {
        '& .MuiTextField-root': {
            margin: 10,
        }
    },
    button: {
        margin: 10,
    }
});

export const AddExercisesForm = () => {
    const [exerciseName, setExerciseName] = useState('');
    const classes = useStyles();
    const [exercises, setExercises] = useState<ExerciseToAddToList[] | null>(null);

    useEffect(() => {
        (async () => {
            await fetchExercises();
        })()
    }, [])

    const fetchExercises = async () => {
        const res = await fetch('http://localhost:3001/exercise');
        const data = await res.json();
        setExercises(data.exercises);
        console.log(exercises)
    }

    const removeExerciseHandler = async (id: string) => {
        const res = await fetch(`http://localhost:3001/exercise/${id}`, {
            method: 'DELETE'
        })
        const data = await res.json();
        console.log(data)
        if (data.isSuccess) {
            await fetchExercises();
        }
    }

    if (!exercises) {
        return <p>Loading</p>
    }


    const addNewExerciseHandler = async (event: FormEvent) => {
        event.preventDefault();
        console.log(exerciseName);
        const res = await fetch(`http://localhost:3001/exercise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ exerciseName })
        })
        const data = await res.json();
        console.log(data)
        setExerciseName('');

        if (data) {
            await fetchExercises();
        }
    }

    return (
        <>
            <form className={classes.root} onSubmit={addNewExerciseHandler}>
                <Typography
                    variant="h2"
                >Dodaj ćwiczenia do listy</Typography>

                <div>
                    <TextField
                        name='exerciseName'
                        label='Exercise name'
                        value={exerciseName}
                        variant='filled'
                        onChange={event => setExerciseName(event.target.value)}
                    />
                </div>

                <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    type='submit'
                    size='medium'
                    endIcon={<SendIcon />}
                >
                    Zapisz
                </Button>
            </form>
            <ExercisesList exercises={exercises} removeExerciseHandler={removeExerciseHandler} />
        </>
    )
}