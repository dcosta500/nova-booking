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
    boxStyle: {
      height: props.height === undefined ? "75vh" : props.height,
    },
  };

  let content = props.children;

  return (
    <Box sx={styles.boxStyle} className="plate">
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
