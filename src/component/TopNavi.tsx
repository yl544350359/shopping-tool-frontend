import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import MenuIcon from '@mui/icons-material/Menu';
import PageMenu from './Menu'
import { useTranslation } from "react-i18next";

export default function TopNavigator() {
  const { t } = useTranslation();
  const [title, setTitle] = React.useState(t("common.calculator")!);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <PageMenu title={title} setTitle={setTitle}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}