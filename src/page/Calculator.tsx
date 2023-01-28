import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import SearchBar from '../component/SearchBar';
import { AlertTitle, 
    CircularProgress, 
    Card, 
    CardContent,
    CardMedia,
    Typography,
    Chip
 } from '@mui/material';
 import CheckIcon from '@mui/icons-material/Check';
 import Divider from '@mui/material/Divider';
 import ClearIcon from '@mui/icons-material/Clear';
 import { useTranslation } from "react-i18next";

export interface ItemDetail {
    price_jpy: number;
    price_cny: number;
    item_name: string;
    img_url: string;
    shipping_fee_tag: Boolean;
    sold_out_flag: Boolean;
    discription: string
}

export default function Calculator() {
    const [item, setItem] = React.useState<ItemDetail | null>(null)
    const [errmsg, setErrmsg] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(false)
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                mt: 1,
                alignItems: "center",
                gap: 1
            }}>
            <SearchBar item={item} setItem={setItem} setErrmsg={setErrmsg} setLoading={setLoading} />
            {item  && !errmsg && !loading && <Card sx={{ maxWidth: 400}}>
                <CardMedia
                component='img'
                alt='This is picture'
                height="350"
                image={item.img_url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                    {item.item_name}
                    </Typography>
                    <Typography sx={{color:'#1976d2'}} variant="h4">
                        {`${t("calculator.cny_price")}${item.price_cny}`}
                    </Typography>
                    <Typography sx={{color:'#bdbdbd'}}>
                        {`${t("calculator.jpy_price")}${item.price_jpy}`}
                    </Typography>
                    <Box sx={{
                        display:"flex",
                        gap:1,
                        justifyContent:"center"
                    }}
                    margin={1}>
                        {item.shipping_fee_tag? <Chip icon={<CheckIcon />} color="success" label={t("calculator.include_fee_label")} />:<Chip icon={<ClearIcon />} color="error" label={t("calculator.exclude_fee_lable")} />}
                        {item.sold_out_flag? <Chip icon={<ClearIcon />} color="error" label={t("calcualtor.soldout_lable")} />:<Chip icon={<CheckIcon />} color="success" label={t("calculator.buyable_label")} />}
                    </Box>
                    <Divider />
                    <Typography>
                    {item.discription}
                    </Typography>
                </CardContent>
            </Card>}
            {loading && <CircularProgress />}
            {errmsg && <Alert
                severity='error'
                sx={{
                    width: 400
                }}>
                <AlertTitle>Error</AlertTitle>
                {errmsg}
            </Alert>}
        </Box>
    )
}