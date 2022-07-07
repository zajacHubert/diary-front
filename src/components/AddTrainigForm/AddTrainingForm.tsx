import React, { useState, FormEvent, ChangeEvent } from "react";
import { ExerciseToAddToTraining } from 'types'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';


type T = keyof ExerciseToAddToTraining;

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


export const AddTrainingForm = () => {
    const [trainingName, setTrainingName] = useState('');
    const [trainingDate, setTrainingDate] = useState(`${new Date().toISOString().slice(0, 10)}`)
    const classes = useStyles();
    const [inputFields, setInputFields] = useState<ExerciseToAddToTraining[]>([
        {
            exerciseName: '',
            reps: '',
            weights: '',
        },
    ]);

    const changeInputHanlder = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const values = [...inputFields];
        values[index][event.target.name as T] = event.target.value;
        setInputFields(values);
    }

    const formSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const newArr = inputFields.map(el => (
            { ...el, title: trainingName, date: trainingDate }
        ))
        console.log(newArr);

        Promise.all(
            newArr.map(async item => {
                await fetch(`http://localhost:3001/training`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item)
                })
            })
        )

        setInputFields([
            {
                exerciseName: '',
                reps: '',
                weights: '',
            },
        ]);
        setTrainingDate(`${new Date().toISOString().slice(0, 10)}`);
        setTrainingName('');
    }

    const addFieldHandler = () => {
        setInputFields([...inputFields, {
            exerciseName: '',
            reps: '',
            weights: '',

        }])
    }

    const removeFieldHandler = (index: number) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    return (
        <>
            <Typography
                variant="h2"
                align='center'
                style={{
                    marginBottom: 10,
                }}
            >
                Dodaj trening do dziennika
            </Typography>
            <form className={classes.root} onSubmit={formSubmitHandler}>
                <div>
                    <TextField
                        name='training'
                        label='Nazwa treningu'
                        value={trainingName}
                        variant='outlined'
                        onChange={event => setTrainingName(event.target.value)}
                    />
                    <TextField
                        name='training date'
                        label='Data treningu'
                        type='date'
                        value={trainingDate}
                        variant='outlined'
                        onChange={event => setTrainingDate(event.target.value)}
                    />

                </div>



                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        <TextField
                            name='exerciseName'
                            label='Nazwa ćwiczenia'
                            value={inputField.exerciseName}
                            variant='filled'
                            onChange={event => changeInputHanlder(index, event)}
                        />
                        <TextField
                            name='reps'
                            label='Powtórzenia w seriach'
                            value={inputField.reps}
                            variant='filled'
                            onChange={event => changeInputHanlder(index, event)}
                        />
                        <TextField
                            name='weights'
                            label='Ciężary'
                            value={inputField.weights}
                            variant='filled'
                            onChange={event => changeInputHanlder(index, event)}
                        />

                        <IconButton onClick={() => addFieldHandler()}>
                            <AddIcon />
                        </IconButton>
                        <IconButton onClick={() => removeFieldHandler(index)}>
                            <HorizontalRuleIcon />
                        </IconButton>
                    </div>
                ))}

                <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    type='submit'
                    endIcon={<SendIcon />}
                >
                    Zapisz
                </Button>
            </form>
        </>
    )
} 