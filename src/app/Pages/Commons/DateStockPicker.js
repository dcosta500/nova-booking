// css
import { Box, Typography } from "@mui/material";
import "./DateStockPicker.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt";
import NovaButton from "./NovaButton";
import { useState } from "react";
import dayjs from "dayjs";

const DateStockPicker = (props) => {
  const itemName = props.itemName;
  const onCancel = props.onCancel; // function
  const onAccept = props.onAccept; // function
  const doStock = props.doStock; // boolean

  const minStock = props.minStock === undefined ? 1 : props.minStock;
  const maxStock = props.maxStock === undefined ? 1 : props.maxStock;

  const [stock, setStock] = useState(minStock);
  const [date, setDate] = useState(undefined);
  const [showDateValidationMessage, setShowDateValidationMessage] =
    useState(false);

  const reset = () => {
    setStock(minStock);
    setDate(undefined);
  };

  const onCancelClick = () => {
    reset();
    onCancel();
  };
  const onDateChange = (date) => {
    setDate(date);
  };

  const onAcceptClick = () => {
    if (date !== undefined) {
      if (!date.isBefore(dayjs())) {
        onAccept(date, stock);
        reset();
      } else {
        setShowDateValidationMessage(true);
        setTimeout(() => setShowDateValidationMessage(false), 4000);
      }
    } else {
      setShowDateValidationMessage(true);
      setTimeout(() => setShowDateValidationMessage(false), 4000);
    }
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
    <Box key={props.key} className="datestockpicker-right-picker-content">
      <Typography>Picking: {itemName}</Typography>
      <Box className="datestockpicker-datepicker-topbox">
        <Typography>Reservation until:</Typography>
        <Box height="0.5rem" />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
          <DatePicker onChange={onDateChange} label="Date" />
        </LocalizationProvider>
        {showDateValidationMessage && (
          <Typography sx={{ color: "red" }}>
            Date must be in the future.
          </Typography>
        )}
      </Box>
      {doStock && stockContent}
      <Box className="datestockpicker-datepicker-botbox">
        <NovaButton width="6rem" onClick={onCancelClick}>
          Cancel
        </NovaButton>
        <NovaButton width="6rem" onClick={onAcceptClick}>
          Accept
        </NovaButton>
      </Box>
    </Box>
  );
};

export default DateStockPicker;
