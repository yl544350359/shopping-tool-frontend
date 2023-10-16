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
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { ItemDetail } from './Calculator';
import copy from 'copy-to-clipboard';
interface EnhancedTableToolbarProps {
  numSelected: number;
  items: ItemDetail[];
  selected: string[]
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, items, selected } = props;
  const handleCopyToCliboard = (event: React.MouseEvent<unknown>) => {
    const selectedItems: ItemDetail[]= items.filter((obj)=>selected.includes(obj.item_url))
    const filterProps: string[] = selectedItems.map(obj=>`url: ${obj.item_url}, price: ${obj.price_cny}`)
    const resultString: string = filterProps.join('\n')
    copy(resultString);
    // alert("Copy succeed");
  };

  const handleDelete = (event: React.MouseEvent<unknown>) => {
    
  }
  return (
    <Toolbar
      sx={{
        justifyContent: "space-between",
        width: "100%",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        minHeight: { sm: 24 }
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
      )}
      {numSelected > 0 && (
        <Box sx={{
          display: "flex",
          flexDirection: "row",
        }}>
          <Tooltip title="Copy info">
            <IconButton size='small' onClick={handleCopyToCliboard}>
              <ContentPasteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size='small'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
}


const staticData: ItemDetail[] = [{
  "item_url": "https://jp.mercari.com/item/m61443717755",
  "price_jpy": 750,
  "price_cny": 49,
  "item_name": "新品未使用品 GU ニット トップス レディース ブルー系",
  "img_url": "https://static.mercdn.net/item/detail/orig/photos/m61443717755_1.jpg?1695801275",
  "shipping_fee_tag": true,
  "sold_out_flag": false,
  "discription": "数年前にGUで購入しました。\nタグ付いてませんが一度も着てません。\n\n家保管ですが綺麗でいい状態です！\nLサイズ。\n\n何かあれば、ご相談ください！"
},
{
  "item_url": "https://jp.mercari.com/item/m61443717756",
  "price_jpy": 750,
  "price_cny": 49,
  "item_name": "test title 2",
  "img_url": "https://static.mercdn.net/item/detail/orig/photos/m61443717755_1.jpg?1695801275",
  "shipping_fee_tag": true,
  "sold_out_flag": false,
  "discription": "数年前にGUで購入しました。\nタグ付いてませんが一度も着てません。\n\n家保管ですが綺麗でいい状態です！\nLサイズ。\n\n何かあれば、ご相談ください！"
},
{
  "item_url": "https://jp.mercari.com/item/m61443717757",
  "price_jpy": 750,
  "price_cny": 49,
  "item_name": "test title 4",
  "img_url": "https://static.mercdn.net/item/detail/orig/photos/m61443717755_1.jpg?1695801275",
  "shipping_fee_tag": true,
  "sold_out_flag": false,
  "discription": "数年前にGUで購入しました。\nタグ付いてませんが一度も着てません。\n\n家保管ですが綺麗でいい状態です！\nLサイズ。\n\n何かあれば、ご相談ください！"
}
]

export default function MyHome() {
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [items, setItems] = React.useState<ItemDetail[]>(staticData);
  const [fexpend, setFexpend] = React.useState(false);
  const toggleAcordion = () => {
    setFexpend((prev) => !prev);
  }

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
      <Card variant="outlined" sx={{ maxWidth: 600, width: "100%", height: '100%' }}>
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
            <Accordion expanded={fexpend} sx={{ maxWidth: '600px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon onClick={toggleAcordion}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ cursor: 'unset !important' }}
              >
                <Typography sx={{ display: "flex", minWidth: '60px', alignItems: "center" }}>{t("my_home.favorite")}</Typography>
                <EnhancedTableToolbar numSelected={selected.length} items={items} selected={selected}/>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <FavoriteTable items={items} selected={selected} setSelected={setSelected} />
              </AccordionDetails>
            </Accordion>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}