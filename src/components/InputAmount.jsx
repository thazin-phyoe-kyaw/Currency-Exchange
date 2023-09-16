import { Grid, InputAdornment, TextField } from "@mui/material";
import React from "react";

function InputAmount({ onChageAmount }) {
  return (
    <Grid item md={5}>
      <TextField
        onChange={onChageAmount}
        label="Amount"
        InputProps={{
          type: "number",
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        fullWidth
      ></TextField>
    </Grid>
  );
}

export default InputAmount;
