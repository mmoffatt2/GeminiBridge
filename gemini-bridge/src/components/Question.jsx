import React from 'react';
import Typography from '@mui/joy/Typography';
import './Question.css';


const Question = ({ questionText }) => {
  return (
    <div className="question-container">
      <Typography variant="body2" color="text.secondary">
          Why we like pointers?
       </Typography>
    </div>
  );
};

export default Question;