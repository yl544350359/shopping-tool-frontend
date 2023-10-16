import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import copy from 'copy-to-clipboard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { ItemDetail } from '../page/Calculator';
import { useTranslation } from "react-i18next";

interface EnhancedTableToolbarProps {
    items: ItemDetail[];
    setItems: (arg0: ItemDetail[]) => void;
    selected: string[];
    setSelected: (arg0: string[]) => void;
    setShowAlert: (arg0:boolean) => void;
  }
  
export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { t } = useTranslation();
    const { items, setItems, selected, setSelected, setShowAlert } = props;
    const handleCopyToCliboard = (event: React.MouseEvent<unknown>) => {
      const selectedItems: ItemDetail[]= items.filter((obj)=>selected.includes(obj.item_url));
      const filterProps: string[] = selectedItems.map(obj=>`url: ${obj.item_url}, price: ${obj.price_cny}`);
      const resultString: string = filterProps.join('\n');
      copy(resultString);
      // alert("Copy succeed");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2100)
    };
  
    const handleDelete = (event: React.MouseEvent<unknown>) => {
      const safeItems: ItemDetail[]=items.filter((obj)=> !selected.includes(obj.item_url));
      setSelected([]);
      setItems(safeItems);
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
        {selected.length > 0 && (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length + t('my_home.selected')}
          </Typography>
        )}
        {selected.length > 0 && (
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
              <IconButton size='small' onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    );
  }
  
  