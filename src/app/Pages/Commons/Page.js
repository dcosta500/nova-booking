import { Box } from "@mui/material";
import Plate from "./Plate";

// css
import "./Page.css";

const Page = (props) => {
  return (
    <Box className="page-container">
      <Plate title={props.title}>{props.children}</Plate>
    </Box>
  );
};

export default Page;
