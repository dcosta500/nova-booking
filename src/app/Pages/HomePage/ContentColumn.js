import * as React from "react";
import { Box, Typography } from "@mui/material";

// css
import "./ContentColumn.css";

/*
    props -> children, title
*/
const ContentColumn = (props) => {
  const styles = {
    columnTitleStyle: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "white",
    },
    noneStyle: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "#7c7c7c",
    },
  };

  const noneContent = (
    <Box className="none-container">
      <Typography sx={{ ...styles.noneStyle }}>None</Typography>
    </Box>
  );

  const listContent = <Box className="content">{props.children}</Box>;

  let content = props.children == undefined ? noneContent : listContent;

  return (
    <Box className="column">
      <Box className="column-title">
        <Typography sx={{ ...styles.columnTitleStyle }}>
          {props.title}
        </Typography>
      </Box>
      {content}
    </Box>
  );
};

export default ContentColumn;
