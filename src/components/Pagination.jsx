// src/components/Pagination.jsx
import React from 'react';
import { Box, Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;
