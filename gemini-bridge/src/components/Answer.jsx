import React, { useState } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import './Answer.css';


const Answer = ({ onSubmitAnswer, setOnSubmitAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');

  // const handleChange = (e) => setUserAnswer(e.target.value);


  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOnSubmitAnswer(userAnswer);
    setUserAnswer(''); // Clear the input after submitting
  };

  return (
    <div className="question-container" style={{ backgroundColor: '#161616', marginTop:"-2.5em" }}>
      <Grid container spacing={2} alignItems="center" style={{ backgroundColor: '#161616' }}>
      <Grid item xs={9}>
        <TextField 
          InputProps={{
            style: { color: 'white', marginBottom: "1em"},
            classes: {
              underline: 'white-underline'
            }
          }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
          label="Your Answer"
          variant="standard"
          fullWidth
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Type your answer here"
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </Grid>
    </Grid>
    </div>
    
    // <div>
    //   <TextField
    //     label="Your Answer"
    //     variant="outlined"
    //     fullWidth
    //     value={userAnswer}
    //     onChange={handleInputChange}
    //     placeholder="Type your answer here"
    //   />
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={handleSubmit}
    //     style={{ marginTop: '1rem' }}
    //   >
    //     Submit
    //   </Button>
    // </div>
  );
};

export default Answer;