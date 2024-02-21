import * as React from 'react';
import TopNavigator from './component/TopNavi';
import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";
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
      <Outlet />
    </Box>
  );
}

export default App;
