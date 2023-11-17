import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

// css
import "./ItemsList.css";

const ItemsList = (props) => {
  const listItems = props.items.map((item, key) => (
    <ListItem key={key} disablePadding>
      <ListItemButton onClick={() => props.onSelect(item)}>
        <Box className="itemslist-button-container">
          <Box className="itemslist-img">
            <img
              style={{ height: "4rem", width: "4rem", marginRight: "1rem" }}
              src={item.image}
            />
          </Box>
          <Box className="itemlist-item-info">
            <ListItemText primary={item.name} />
            <Typography sx={{ fontSize: "0.9rem", color: "#313131" }}>
              {item.stock > 0 ? `Stock: ${item.stock}` : "No stock left."}
            </Typography>
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Box sx={{ overflowY: "scroll", height: props.height, width: "100%" }}>
      <List>{listItems}</List>
    </Box>
  );
};

export default ItemsList;
