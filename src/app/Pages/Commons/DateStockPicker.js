// css
import { Box, Typography } from "@mui/material";
import "./DateStockPicker.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt";
import NovaButton from "./NovaButton";
import { useState } from "react";

const DateStockPicker = (props) => {
  const itemName = props.itemName;
  const onCancel = props.onCancel; // function
  const onAccept = props.onAccept; // function
  const doStock = props.doStock; // boolean

  const minStock = props.minStock === undefined ? 1 : props.minStock;
  const maxStock = props.maxStock === undefined ? 1 : props.maxStock;

  const [stock, setStock] = useState(minStock);

  const onCancelClick = onCancel;

  const onAcceptClick = (date, quantity) => {
    onAccept(date, quantity);
  };

  const increaseStock = () => {
    if (stock + 1 <= maxStock) setStock(stock + 1);
  };

  const decreaseStock = () => {
    if (stock - 1 >= minStock) setStock(stock - 1);
  };

  const stockContent = (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography>Quantity</Typography>
      <Box className="datestockpicker-stock-container">
        <NovaButton width="1rem" onClick={increaseStock}>
          +
        </NovaButton>
        <Typography sx={{ padding: "1rem" }}>{stock}</Typography>
        <NovaButton width="1rem" onClick={decreaseStock}>
          -
        </NovaButton>
      </Box>
    </Box>
  );

  return (
    <Box className="datestockpicker-right-picker-content">
      <Typography>Picking: {itemName}</Typography>
      <Box className="datestockpicker-datepicker-topbox">
        <Typography>Date</Typography>
        <Box height="0.5rem" />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
          <DatePicker label="Date" />
        </LocalizationProvider>
      </Box>
      {doStock && stockContent}
      <Box className="datestockpicker-datepicker-botbox">
        <NovaButton width="6rem" onClick={onCancelClick}>
          Cancel
        </NovaButton>
        <NovaButton
          width="6rem"
          onClick={() => onAcceptClick(undefined /*date*/, stock)}
        >
          Accept
        </NovaButton>
      </Box>
    </Box>
  );
};

export default DateStockPicker;
