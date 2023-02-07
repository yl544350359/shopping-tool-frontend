import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PageMenu from './Menu'
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

export default function TopNavigator() {
  const { t } = useTranslation();
  const location=useLocation();
  var tmp:string;
  if(location.pathname==="/"){
    tmp=t("common.calculator");
  }
  else if(location.pathname==="/Calculator"){
    tmp=t("common.calculator");
  }
  else if(location.pathname==="/ShippingPrice"){
    tmp=t("common.shipping_price");
  }
  else {
    tmp=t("common.not_found");
  }


  const [title,setTitle] = React.useState(tmp);
 
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