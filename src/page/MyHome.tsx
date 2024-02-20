import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteTable from '../component/favoriteTable';
import EnhancedTableToolbar from '../component/tableToolbar';
import { ItemDetail } from './Calculator';
import { motion, AnimatePresence } from "framer-motion";
import { blue, cyan} from '@mui/material/colors';

export default function MyHome() {
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [items, setItems] = React.useState<ItemDetail[]>([]);
  const [fexpend, setFexpend] = React.useState(false);
  const [showAlert, setShowAlert]=React.useState(false);

  const toggleAcordion = () => {
    setFexpend((prev) => !prev);
  }

  React.useEffect(()=> {
    var tmpData:ItemDetail[];
    const tmpString=localStorage.getItem("favorite");
    if(tmpString){
      tmpData=JSON.parse(tmpString);
      console.log(tmpData);
      setItems(tmpData);
    }
  },[])

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      // height: "100%",
      height: {xs: 'calc(100vh - 72px)', sm: 'calc(100vh - 80px)'},
      overflow: 'auto',
      mt: 1,
      alignItems: "center",
      gap: 1
    }}>
      <Card variant="outlined" sx={{ maxWidth: 600, width: "100%" }}>
        <CardMedia
          sx={{
            height: '160px'
          }}
          image="/background.jpeg"
          title="background"
        />
        <CardContent sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}>
          <Box sx={{
            display: "flex",
            gap: 2,
            flexDirection: "column",
            alignSelf: "center",
            alignItems: "center",
            mt: "-44px",
            width: "100%"
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
            <Accordion expanded={fexpend} sx={{ width: '100%'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon onClick={toggleAcordion}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ cursor: 'unset !important' }}
              >
                <Typography sx={{ display: "flex", minWidth: '60px', alignItems: "center" }}>{t("my_home.favorite")}</Typography>
                <EnhancedTableToolbar items={items} setItems={setItems} selected={selected} setSelected={setSelected} setShowAlert={setShowAlert}/>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0}}>
                <FavoriteTable items={items} selected={selected} setSelected={setSelected} />
              </AccordionDetails>
            </Accordion>
            <AnimatePresence>
                {showAlert && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{display: 'flex',
                            width: '160px',
                            height: '48px',
                            background: blue[50],
                            borderRadius: '20px',
                            color: cyan[900],
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: "calc(50% - 24px)",
                            left: "calc(50% - 80px)"
                        }}
                >Copy succeed
                </motion.div>}
            </AnimatePresence>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}