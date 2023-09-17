import React from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";

function CurrencyRow({ countries, label, onChangeCurrency, selectCurrency }) {
  return (
    <Grid item xs={12} md={5}>
      <Autocomplete
        options={Object.keys(countries)}
        fullWidth
        value={selectCurrency}
        onChange={onChangeCurrency}
        renderInput={(params) => <TextField label={label} {...params} />}
      />
    </Grid>
  );
}

export default CurrencyRow;
