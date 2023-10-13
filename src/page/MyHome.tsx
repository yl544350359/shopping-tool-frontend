import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  

export default function MyHome(){
  const { t } = useTranslation();
  return(
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          mt: 1,
          alignItems: "center",
          gap: 1
      }}>
    <Card variant="outlined" sx={{ maxWidth: 600}}>
      <CardMedia
      sx={{
        height: '200px'
      }}
        image="/background.jpeg"
        title="background"
      />
      <CardContent sx={{display: "flex", 
      justifyContent: "center", 
      flexDirection: "column"}}>
      <Box sx={{
        position: "fixed",
        top: "252px",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "center"
      }}>
        <Avatar 
          alt="avatar" 
          src="/avatar-profile.svg" 
          sx={{
            backgroundColor: "white",
            width: 56, 
            height: 56,
          }}
        />
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div"
        >
          {t('my_home.username')}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{marginTop: '56px'}}>
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
    </Card>
  </Box>
  )
}