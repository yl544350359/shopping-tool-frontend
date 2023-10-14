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
import FavoriteTable from '../component/favoriteTable';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { ItemDetail } from './Calculator';

interface EnhancedTableToolbarProps {
    numSelected: number;
  }
  
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
        justifyContent: "space-between",
        width: "100%",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        minHeight: {sm: 24 }
        //   ...(numSelected > 0 && {
        //     bgcolor: (theme) =>
        //       alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        //   }),
        }}
      >
        {numSelected > 0 && (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) }
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

const staticData:ItemDetail[]=[{
    "item_url": "https://jp.mercari.com/item/m61443717755",
    "price_jpy": 750,
    "price_cny": 49,
    "item_name": "新品未使用品 GU ニット トップス レディース ブルー系",
    "img_url": "https://static.mercdn.net/item/detail/orig/photos/m61443717755_1.jpg?1695801275",
    "shipping_fee_tag": true,
    "sold_out_flag": false,
    "discription": "数年前にGUで購入しました。\nタグ付いてませんが一度も着てません。\n\n家保管ですが綺麗でいい状態です！\nLサイズ。\n\n何かあれば、ご相談ください！"
}]

export default function MyHome() {
    const { t } = useTranslation();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [items, setItems] = React.useState<ItemDetail[]>(staticData);

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
                        <Accordion sx={{maxWidth:'600px'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{display: "flex", minWidth: '60px', alignItems: "center"}}>{t("my_home.favorite")}</Typography>
                                <EnhancedTableToolbar numSelected={selected.length}/>
                            </AccordionSummary>
                            <AccordionDetails sx={{padding: 0}}>
                                <FavoriteTable items={items} selected={selected} setSelected={setSelected}/>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}