// src/components/CarCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CarCard = ({ car, onWishlistToggle, isWishlisted, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card
        sx={{ width: 300, borderRadius: 3, boxShadow: 4, cursor: 'pointer' }}
        onClick={onClick}
      >
        <CardMedia component="img" height="180" image={car.image} alt={car.model} />
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            {car.brand} {car.model}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2">Fuel: {car.fuel}</Typography>
            <Typography variant="body2">Seats: {car.seating}</Typography>
          </Box>
          <Typography variant="subtitle1" fontWeight={500} mt={1}>
            ${car.price.toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle(car);
            }}
            color={isWishlisted ? 'error' : 'default'}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default CarCard;
