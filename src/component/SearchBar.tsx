import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import {ItemDetail} from '../page/Calculator'

type Props= {
  item: ItemDetail|null;
  setItem: (arg0: ItemDetail) => void;
  setErrmsg: (arg0: string) => void;
  setLoading :(arg0: boolean) => void
}

export default function SearchBar({item, setItem, setErrmsg, setLoading}:Props) {
    const [url, setUrl] = React.useState<string>("");
    const { t } = useTranslation();
    const handleSearch=(itemUrl:string) => {
      setErrmsg("");
      setLoading(true);
      fetch("http://localhost:8001/itemDetail", {
        method: 'POST',
        body: JSON.stringify({
          item_url: itemUrl
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response)=> response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setItem(data);
      })
      .catch((err) => setErrmsg(err.message))
    }
    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t('calculator.search_label')!}
        inputProps={{ 'aria-label': t('calculator.search_label')! }}
        value={url}
        onChange={(event)=> setUrl(event.target.value)}
      />
      {url && <IconButton type="button" sx={{ p: '10px' }} aria-label="delete" onClick={() => setUrl("")}>
        <HighlightOffTwoToneIcon />
      </IconButton>}
      <IconButton type="button" sx={{ p: '10px' }} onClick={() => handleSearch(url)} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
