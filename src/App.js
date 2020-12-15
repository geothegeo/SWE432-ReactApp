import React from 'react';
import './App.css';
import { Button, Grid, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

function App() {
  const [inputStrings, setInputStrings] = React.useState("");
  const [outputStrings, setOutputStrings] = React.useState("");
  const [replacement, setReplacement] = React.useState(true);
  const handleInputChange = (event) => {
    setInputStrings(event.target.value);
  }
  const handleReplacement = () => {
    setReplacement(!replacement);
  }

  const chooseString = () => {
    const strings = inputStrings.split("\n");
    const chosen = strings[Math.floor(Math.random() * Math.floor(strings.length))];
    if(inputStrings === "") {
      return;
    }
    if(outputStrings === "") {
      setOutputStrings(chosen);
    }
    else {
      setOutputStrings(outputStrings + "\n" + chosen);
    }
    if(!replacement) {
      const index = strings.indexOf(chosen);
      if (index > -1) {
        strings.splice(index, 1);
      }
      setInputStrings(strings.toString().replaceAll(",", "\n"));
    }
  }
  const clearAll = async () => {
    setInputStrings("");
    setOutputStrings("");
  }

  return (
    <div className="App" style={{margin: '3em 10%', flexGrow: 1}}>
      <Grid container justify="center">
        <Grid item xs>
          <TextField 
            label="Strings to Be Chosen" 
            variant="outlined" 
            multiline 
            rows={20}
            value={inputStrings}
            onChange={handleInputChange}
          >

          </TextField>
        </Grid>
        <Grid item container xs direction="column" justify="center" alignItems="center">
          <p><b>How This Works:</b> <br/>Enter any number of strings into the left text box, separating them
          with new lines. Your randomly chosen string will be added to the text box on the right.
          <br/>[WITH REPLACEMENT] will keep the randomly chosen string in your list.
          <br/>[WITHOUT REPLACEMENT] will remove the randomly chosen string from your list. <hr /></p>
          
          <ToggleButtonGroup 
            value={replacement}
            exclusive
            onChange={handleReplacement}
          >
            <ToggleButton value={true}> With Replacement </ToggleButton>
            <ToggleButton value={false}> Without Replacement </ToggleButton>
          </ToggleButtonGroup>
          <Button 
            variant="contained"
            color="primary"
            disableElevation
            onClick={chooseString}>
            Choose A Random String!
          </Button>
          <Button 
            variant="contained"
            color="secondary"
            disableElevation
            onClick={clearAll}>
            Clear All Strings!
          </Button>
        </Grid>
        <Grid item xs>
          <TextField 
            label="Chosen Strings" 
            variant="outlined" 
            multiline 
            rows={20}
            value={outputStrings}
            InputProps={{
              readOnly: true,
            }}
          >

          </TextField>
        </Grid>
      </Grid>
      
    </div>
  );
}

export default App;
