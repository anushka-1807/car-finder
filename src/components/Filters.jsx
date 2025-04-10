// src/components/Filters.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Button,
  Grid,
  Typography,
  Paper,
  TextField,
} from '@mui/material';

const Filters = ({ cars, onFilter, onSearch }) => {
  const [brand, setBrand] = useState('');
  const [fuel, setFuel] = useState('');
  const [seating, setSeating] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [search, setSearch] = useState('');

  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [uniqueFuels, setUniqueFuels] = useState([]);
  const [uniqueSeating, setUniqueSeating] = useState([]);

  useEffect(() => {
    setUniqueBrands([...new Set(cars.map((car) => car.brand))]);
    setUniqueFuels([...new Set(cars.map((car) => car.fuel))]);
    setUniqueSeating([...new Set(cars.map((car) => car.seating))]);
  }, [cars]);

  const handleApplyFilters = () => {
    onFilter({
      brand,
      fuel,
      seating,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Grid container spacing={3}>
        {/* Search Input */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Search by brand or model"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
          />
        </Grid>

        {/* Brand Filter */}
        <Grid item xs={12} md={3}>
          <Typography variant="body2" fontWeight={500} mb={1}>
            Brand
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Select Brand</InputLabel>
            <Select
              value={brand}
              label="Select Brand"
              onChange={(e) => setBrand(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueBrands.map((b, i) => (
                <MenuItem key={i} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Fuel Type Filter */}
        <Grid item xs={12} md={3}>
          <Typography variant="body2" fontWeight={500} mb={1}>
            Fuel Type
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Select Fuel</InputLabel>
            <Select
              value={fuel}
              label="Select Fuel"
              onChange={(e) => setFuel(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueFuels.map((f, i) => (
                <MenuItem key={i} value={f}>
                  {f}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Seating Capacity Filter */}
        <Grid item xs={12} md={3}>
          <Typography variant="body2" fontWeight={500} mb={1}>
            Seating Capacity
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Select Seats</InputLabel>
            <Select
              value={seating}
              label="Select Seats"
              onChange={(e) => setSeating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueSeating.map((s, i) => (
                <MenuItem key={i} value={s}>
                  {s} Seats
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Price Range Slider */}
        <Grid item xs={12} md={3}>
          <Typography variant="body2" fontWeight={500} mb={1}>
            Price Range (${priceRange[0]} - ${priceRange[1]})
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
            step={1000}
          />
        </Grid>

        {/* Apply Filters Button */}
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button variant="contained" size="medium" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filters;
