import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import SearchBar from '../component/SearchBar';
import {
    AlertTitle,
    CircularProgress,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Backdrop
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from "react-i18next";
import Fab from '@mui/material/Fab';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import cookie from 'react-cookies';

export interface ItemDetail {
    [k:string]:any;
    item_url: string;
    price_jpy: number;
    price_cny: number;
    item_name: string;
    img_url: string;
    shipping_fee_tag: Boolean;
    sold_out_flag: Boolean;
    discription: string
}

function isInCookie(cookieList:ItemDetail[]|undefined|null, keyName:string, targetKey:any): boolean {
    var flag:boolean =false;
    if(cookieList){  
        for (const item of cookieList){
            if(item[keyName]===targetKey){
                flag=true;
                break;
            }
        }
    }
    return flag;

}
export default function Calculator() {
    const [item, setItem] = React.useState<ItemDetail | null>(null);
    const [errmsg, setErrmsg] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [favorite, setFavorite] = React.useState<boolean>(false);
    const [curCookie, setCurCookie]=React.useState<ItemDetail[]>([]);
    const { t } = useTranslation();

    React.useEffect(()=>{
        var tmpData:ItemDetail[];
        tmpData=cookie.load("favorite",false);
        if(tmpData){
            setCurCookie(tmpData);
            setFavorite(isInCookie(curCookie,'item_url',item?.item_url))
        }
        // setCurCookie(cookie.load("favorite",false));
        // setFavorite(isInCookie(curCookie,'item_url',item?.item_url))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[item]);
    
    const addFavorite = (oldCookie:ItemDetail[]) => {
        // var oldCookie: ItemDetail[]|undefined=cookie.load("favorite",false);
        var newCookie:ItemDetail[]=[];
        const expireDate=new Date(Date.now()+365*24*60*60*1000);
        if (!oldCookie){
            console.log("No cookie found.");
            newCookie=[item!];
        }
        else if (!isInCookie(oldCookie,"item_url",item?.item_url)){
            console.log("Item not in cookie.");
            newCookie=[...oldCookie!];
            newCookie.push(item!);
        }
        else {
            console.log("Item already exists");
            newCookie=[...oldCookie!];
        }
        console.log(newCookie);
        cookie.save("favorite",JSON.stringify(newCookie),{path:"/",expires: expireDate});
        var tmpData:ItemDetail[];
        tmpData=cookie.load("favorite",false);
        console.log(tmpData);
        setFavorite(true);
    }

    const removeFavorite = (oldCookie:ItemDetail[]) => {
        // var newCookie:ItemDetail[]=[];
        const expireDate=new Date(Date.now()+365*24*60*60*1000);
        const index = oldCookie?.findIndex(element => element.item_url===item?.item_url);
        if (index!== -1) {
            console.log("Find item in cookie.")
            oldCookie.splice(index,1);
        }
        else {
            console.log("Fail to find item in cookie.")
            // newCookie=oldCookie;
        }
        console.log(oldCookie);
        cookie.save("favorite",JSON.stringify(oldCookie),{path:"/",expires: expireDate});
        setFavorite(false);
    }

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
            {item && !errmsg && !loading && <Card sx={{ maxWidth: 400 }}>
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
                    <Typography sx={{ color: '#1976d2' }} variant="h4">
                        {`${t("calculator.cny_price")}${item.price_cny}`}
                    </Typography>
                    <Typography sx={{ color: '#bdbdbd' }}>
                        {`${t("calculator.jpy_price")}${item.price_jpy}`}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center"
                    }}
                        margin={1}>
                        {item.shipping_fee_tag ? <Chip icon={<CheckIcon />} color="success" label={t("calculator.include_fee_label")} /> : <Chip icon={<ClearIcon />} color="error" label={t("calculator.exclude_fee_label")} />}
                        {item.sold_out_flag ? <Chip icon={<ClearIcon />} color="error" label={t("calculator.soldout_label")} /> : <Chip icon={<CheckIcon />} color="success" label={t("calculator.buyable_label")} />}
                    </Box>
                    <Divider />
                    <Typography>
                        {item.discription}
                    </Typography>
                    {favorite ? <Fab
                        size="medium"
                        color="secondary"
                        aria-label="remove"
                        onClick={()=>removeFavorite(curCookie)}
                        sx={{
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                            position: "fixed",
                            bottom: "40px",
                            right: `${window.innerWidth < 544 ? 24 : (window.innerWidth - 448)/2-48}px`
                        }}
                        >
                        <BookmarkRemoveIcon />
                    </Fab>:
                    <Fab
                        size="medium"
                        color="secondary"
                        aria-label="add"
                        onClick={()=>addFavorite(curCookie)}
                        sx={{
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                            position: "fixed",
                            bottom: "40px",
                            right: `${window.innerWidth < 544 ? 24 : (window.innerWidth - 448)/2-48}px`
                        }}
                        >
                        <BookmarkAddIcon />
                    </Fab>}

                </CardContent>
            </Card>}
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {errmsg && <Alert
                severity='error'
                sx={{
                    width: "100%",
                    maxWidth: '376px'
                }}>
                <AlertTitle>Error</AlertTitle>
                {errmsg}
            </Alert>}

        </Box>
    )
}