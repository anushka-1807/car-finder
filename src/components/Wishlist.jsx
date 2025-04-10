// src/components/Wishlist.jsx
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Wishlist = ({ wishlist, onRemove }) => {
  if (wishlist.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Your Wishlist
      </Typography>
      <List dense>
        {wishlist.map((car, index) => (
          <React.Fragment key={car.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => onRemove(car)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${car.brand} ${car.model}`}
                secondary={`$${car.price.toLocaleString()}`}
              />
            </ListItem>
            {index !== wishlist.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Wishlist;
