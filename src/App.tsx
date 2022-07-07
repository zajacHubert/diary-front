import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Container from '@mui/material/Container';
import { Header } from "./components/Header/Header";
import { NotFoundView } from "./views/NotFoundView";
import { AddTrainingView } from "./views/AddTrainingView";
import { TrainigListView } from "./views/TrainingListView";
import { ExercisesView } from "./views/ExercisesView";

import { SingleTrainigView } from "./views/SingleTrainigView";


export const App = () => {

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/training/add-form" replace />} />
        <Route path="/training/add-form" element={<AddTrainingView />} />
        <Route path="/training" element={<TrainigListView />} />
        <Route path="/training/:date/:title" element={<SingleTrainigView />} />
        <Route path="/exercise" element={<ExercisesView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Container >
  );
}


