// src/components/CarDetailsModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CarDetailsModal = ({ open, onClose, car }) => {
  if (!car) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {car.brand} {car.model}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <img
          src={car.image}
          alt={car.model}
          style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body1">Fuel: {car.fuel}</Typography>
          <Typography variant="body1">Seating: {car.seating}</Typography>
          <Typography variant="body1">Price: ${car.price}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailsModal;
