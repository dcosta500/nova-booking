import { InputAdornment, TextField } from "@mui/material";

import "./NovaTextField.css";

const NovaTextField = (props) => {
  return (
    <TextField
      label={props.label}
      type={props.isPassword ? "password" : undefined}
      className="text-field"
      sx={{
        input: {
          color: "white",
        },
      }}
      InputLabelProps={{
        style: {
          color: "white",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{props.icon}</InputAdornment>
        ),
      }}
    />
  );
};

export default NovaTextField;
