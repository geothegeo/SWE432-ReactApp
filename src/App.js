import React from 'react';
import './App.css';
import { Button, Grid, TextField, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';

function App() {
  const [inputStrings, setInputStrings] = React.useState("");
  const [outputStrings, setOutputStrings] = React.useState("");
  const [sortOrder, setOrder] = React.useState("ascending");
  const [sortType, setType] = React.useState("textual");

  const handleInputChange = (event) => {
    setInputStrings(event.target.value);
  }

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const sortString = () => {
    const strings = inputStrings.split("\n");
    var uniqueArr = [];
    var nums = [];
    var result = [];
    var nan = 0;
    if(inputStrings === "") {
      return ;
    } else {
      let sorted_arr = strings.slice().sort();
      for (let i = 0; i < sorted_arr.length; i++) {
        if (!uniqueArr.includes(sorted_arr[i])) {
          uniqueArr.push(sorted_arr[i]);
        }
      }
    }

    if(sortType === "textual") {
      if(sortOrder === "descending") {
        result = uniqueArr.reverse();
      } else {
        result = uniqueArr;
      }
    } else {
      for (let i = 0; i < uniqueArr.length; i++)
      {
        if(parseFloat(uniqueArr[i]) === 'NaN') {
          nan = 1;
          break;
        } else {
          nums.push(parseFloat(uniqueArr[i]));
        } 
      }
      if(nan == 0 && sortOrder === "ascending") {
        result = nums.sort(function(a, b){return a-b});
      } else {
        result = nums.sort(function(a, b){return b-a});
      }
    }
    if(nan == 0) setOutputStrings(result.toString().replaceAll(",", "\n"));
    else {
      setOutputStrings("Warning: Not all values are numeric");
    }
  }

  const clearAll = async () => {
    setInputStrings("");
    setOutputStrings("");
  }

  return (
    <div className="App" style={{margin: '3em 10%', flexGrow: 1}}>
      <Grid container>
        <Grid item xs>
          <TextField 
            label="Strings to Be Sorted" 
            variant="outlined" 
            multiline 
            rows={25}
            value={inputStrings}
            onChange={handleInputChange}
          >

          </TextField>
        </Grid>
        <Grid item container xs display="flex" direction="column">
          <p><b>How This Works:</b> 
          <br/>Enter any number of strings into the left text box, separating them
          with new lines. Your newly sorted strings will be sorted and displayed in the text box on the right.
          Duplicate inputs will only appear once. Below are different sorting options:</p>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort By Order:</FormLabel>
            <RadioGroup 
              name="order" 
              value={sortOrder} 
              onChange={handleOrderChange}>
              <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
              <FormControlLabel value="descending" control={<Radio />} label="Descending" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort By Type:</FormLabel>
            <RadioGroup 
              name="type" 
              value={sortType} 
              onChange={handleTypeChange}>
              <FormControlLabel value="textual" control={<Radio />} label="Textual" />
              <FormControlLabel value="numeric" control={<Radio />} label="Numeric (please have only numbers)" />
            </RadioGroup>
          </FormControl>
          <br />
          <Button 
            variant="contained"
            color="primary"
            disableElevation
            onClick={sortString}>
            Sort Strings!
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
            label="Sorted Strings" 
            variant="outlined" 
            multiline 
            rows={25}
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
