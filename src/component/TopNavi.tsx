import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import MenuIcon from '@mui/icons-material/Menu';
import PageMenu from './Menu'
import { useTranslation } from "react-i18next";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { useNavigate } from 'react-router-dom';

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function TopNavigator() {
  const { t } = useTranslation();
  const [title, setTitle] = React.useState(t("common.calculator")!);
  const navigate = useNavigate();

  const handleNavigate = (path:string,key:string) => {
      setTitle(t(key)!);
      navigate(path);
  }
  return (
      <AppBar position="static">
        <Toolbar
          sx = {{
            justifyContent: "space-between"
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <PageMenu title={title} setTitle={setTitle}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Box>
          <HomeIcon sx={{color: 'white', cursor: 'pointer'}} onClick={() => handleNavigate('/MyHome','common.my_home')}/>
        </Toolbar>
      </AppBar>
  );
}