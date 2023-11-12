import * as React from "react";
import { Box, Typography } from "@mui/material";

// css
import "./Plate.css";

const Plate = (props) => {
  const styles = {
    columnTitleStyle: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "white",
    },
  };

  let content = props.children;

  return (
    <Box className="plate">
      <Box className="plate-title">
        <Typography sx={{ ...styles.columnTitleStyle }}>
          {props.title}
        </Typography>
      </Box>
      {content}
    </Box>
  );
};

export default Plate;
