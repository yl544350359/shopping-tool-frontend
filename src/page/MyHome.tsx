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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


export default function MyHome() {
    const { t } = useTranslation();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            mt: 1,
            alignItems: "center",
            gap: 1
        }}>
            <Card variant="outlined" sx={{ maxWidth: 600, width: "100%", height: '100%'}}>
                <CardMedia
                    sx={{
                        height: '200px'
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
                        mt: "-44px"
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
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        </Box>
    )
}