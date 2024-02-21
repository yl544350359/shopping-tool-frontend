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
import Grow from '@mui/material/Grow';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from "react-i18next";
import Fab from '@mui/material/Fab';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

export interface ItemDetail {
    [k: string]: any;
    item_url: string;
    price_jpy: number;
    price_cny: number;
    item_name: string;
    img_url: string;
    shipping_fee_tag: Boolean;
    sold_out_flag: Boolean;
    discription: string
}

function isInLocalStorage(savedList: ItemDetail[] | undefined | null, keyName: string, targetValue: any): boolean {
    var flag: boolean = false;
    if (savedList) {
        for (const item of savedList) {
            if (item[keyName] === targetValue) {
                flag = true;
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
    const [curSave, setCurSave] = React.useState<ItemDetail[]>([]);
    const { t } = useTranslation();

    React.useEffect(() => {
        var tmpData: ItemDetail[];
        const temString = localStorage.getItem("favorite")
        if (temString) {
            tmpData = JSON.parse(temString)
            setCurSave(tmpData);
            setFavorite(isInLocalStorage(curSave, 'item_url', item?.item_url));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    const addFavorite = (oldSaveList: ItemDetail[]) => {
        var newSaveList: ItemDetail[] = [];
        if (!oldSaveList) {
            console.log("No local storage found.");
            newSaveList = [item!];
        }
        else if (!isInLocalStorage(oldSaveList, "item_url", item?.item_url)) {
            console.log("Item not in local storage.");
            newSaveList = [...oldSaveList!];
            newSaveList.push(item!);
        }
        else {
            console.log("Item already exists");
            newSaveList = [...oldSaveList!];
        }
        localStorage.setItem("favorite", JSON.stringify(newSaveList))
        setFavorite(true);
    }

    const removeFavorite = (oldSaveList: ItemDetail[]) => {
        const index = oldSaveList?.findIndex(element => element.item_url === item?.item_url);
        if (index !== -1) {
            console.log("Find item in local storage.")
            oldSaveList.splice(index, 1);
        }
        else {
            console.log("Fail to find item in local storage.")
        }
        console.log(oldSaveList);
        localStorage.setItem("favorite", JSON.stringify(oldSaveList));
        setFavorite(false);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                // height: "100%",
                mt: 1,
                pb: 1,
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
                    <Grow in={favorite}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(favorite ? { timeout: 1000 } : {})}>
                        <Fab
                            size="medium"
                            color="primary"
                            aria-label="remove"
                            onClick={() => removeFavorite(curSave)}
                            sx={{
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                position: "fixed",
                                bottom: "40px",
                                right: `${window.innerWidth < 544 ? 24 : (window.innerWidth - 448) / 2 - 48}px`
                            }}
                        >
                            <BookmarkRemoveIcon />
                        </Fab>
                    </Grow>
                    <Grow
                        in={!favorite}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(favorite ? {} : { timeout: 1000 })}
                    >
                        <Fab
                            size="medium"
                            color="primary"
                            aria-label="add"
                            onClick={() => addFavorite(curSave)}
                            sx={{
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                position: "fixed",
                                bottom: "40px",
                                right: `${window.innerWidth < 544 ? 24 : (window.innerWidth - 448) / 2 - 48}px`
                            }}
                        >
                            <BookmarkAddIcon />
                        </Fab>
                    </Grow>

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