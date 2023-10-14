import * as React from 'react';
// import logo from './logo.svg';
// import './App.css';
import TopNavigator from './component/TopNavi';
import { Routes, Route } from "react-router-dom";
import * as page from "./page";
import { Box } from '@mui/material';
function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      height={'calc(100vh - 16px)'}
    >
      <TopNavigator />
      <Routes>
        <Route path="/" element={<page.Calculator />} />
        <Route path="/Calculator" element={<page.Calculator />} />
        <Route path="/ShippingPrice" element={<page.ShippingPrice />} />
        <Route path="/MyHome" element={<page.MyHome />} />
        <Route path="*" element={<page.NotFound />} />
    </Routes>
    </Box>
  );
}

export default App;
