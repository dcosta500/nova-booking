import { Button } from "@mui/material";

import "./NovaButton.css";

const NovaButton = (props) => {
  return (
    <Button
      onMouseEnter={props.onMouseEnter}
      onClick={props.onClick}
      className="nova-button"
      variant="contained"
    >
      {props.children}
    </Button>
  );
};

export default NovaButton;
