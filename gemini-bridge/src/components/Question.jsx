import React from 'react';
import Typography from '@mui/joy/Typography';
import { TextField, Grid, Button } from '@mui/material';
import './Question.css';


const Question = ({ questionText }) => {
  return (
    <>
    <div className="question-container" style={{ backgroundColor: '#161616' }}>
      <Typography variant="h2" color='white' fontWeight='bold'>
          Comprehension Question
       </Typography>
      <Typography variant="h4" color='white'>
          Why do we like pointers?
       </Typography>

    </div>
    </>
  );
};

export default Question;