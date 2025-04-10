import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import CarCard from './components/CarCard';
import Filters from './components/Filters';
import Wishlist from './components/Wishlist';
import Pagination from './components/Pagination';
import CarDetailsModal from './components/CarDetailsModal';

const App = () => {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCars, setTotalCars] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);

  const carsPerPage = 10;
  const API_BASE_URL = 'https://67f777a342d6c71cca654cf9.mockapi.io/cars';

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    fetchCars();
  }, [currentPage, filters, searchQuery]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();

      let filtered = [...data];

      if (filters.brand) filtered = filtered.filter(car => car.brand === filters.brand);
      if (filters.fuel) filtered = filtered.filter(car => car.fuel === filters.fuel);
      if (filters.seating) filtered = filtered.filter(car => car.seating.toString() === filters.seating);
      if (filters.minPrice) filtered = filtered.filter(car => car.price >= filters.minPrice);
      if (filters.maxPrice) filtered = filtered.filter(car => car.price <= filters.maxPrice);
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          car => car.brand.toLowerCase().includes(q) || car.model.toLowerCase().includes(q)
        );
      }

      setTotalCars(filtered.length);
      const paginated = filtered.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);
      setCars(paginated);
    } catch (err) {
      setError('Failed to fetch cars from API.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (f) => {
    setFilters(f);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleWishlist = (car) => {
    const isInWishlist = wishlist.some((item) => item.id === car.id);
    const updatedWishlist = isInWishlist
      ? wishlist.filter((item) => item.id !== car.id)
      : [...wishlist, car];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <Container sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom align="center">
          🚗 Car Finder App
        </Typography>

        <Box sx={{ my: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
          <Filters onFilter={handleFilter} onSearch={handleSearch} cars={cars} />
        </Box>

        <Box sx={{ mb: 4, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
          <Wishlist wishlist={wishlist} onRemove={handleWishlist} />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Snackbar open autoHideDuration={6000}>
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Grid item>
                  <CarCard
                    car={car}
                    onWishlistToggle={handleWishlist}
                    isWishlisted={wishlist.some((item) => item.id === car.id)}
                    onClick={() => setSelectedCar(car)}
                  />
                </Grid>
              </motion.div>
            ))}
          </Grid>
        )}

        <Pagination
          totalItems={totalCars}
          itemsPerPage={carsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <CarDetailsModal
          open={Boolean(selectedCar)}
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      </motion.div>
    </Container>
  );
};

export default App;
