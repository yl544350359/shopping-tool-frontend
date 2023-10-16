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

interface EnhancedTableToolbarProps {
    numSelected: number;
    items: ItemDetail[];
    selected: string[]
  }
  
export default   function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
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
  
  