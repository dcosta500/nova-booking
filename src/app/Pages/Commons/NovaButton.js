import { Button } from "@mui/material";

import "./NovaButton.css";

const NovaButton = (props) => {
  return (
    <Button
      sx={{ width: props.width }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={props.onClick}
      className="nova-button"
      variant="contained"
    >
      {props.children}
    </Button>
  );
};

export default NovaButton;
