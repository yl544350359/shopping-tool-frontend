import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

export default function SearchBar() {
    const [url, setUrl] = React.useState<string>("");
    const { t } = useTranslation();
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
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
  );
}
