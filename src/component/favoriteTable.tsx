import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { ItemDetail } from '../page/Calculator';
import { useTranslation } from "react-i18next";

type Props={
    items: ItemDetail[],
    selected: string[],
    setSelected: (arg0: string[]) => void;
};

interface Column {
    id: 'check_box' | 'image_url' | 'item_name' | 'price_cny';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
}

export default function FavoriteTable({items, selected, setSelected}:Props) {
    const { t } = useTranslation();
    const isSelected = (url: string) => selected.indexOf(url) !== -1;
    const headCells: readonly Column[] = [
        {
            id: 'check_box',
            label: t("my_home.select"),
            minWidth: 48,
            align: 'center'
        },
        {
            id: 'image_url',
            label: t("my_home.picture"),
            minWidth: 48,
            align:'center'
        },
        {
            id: 'item_name',
            label: t("my_home.title"),
            minWidth: 96,
            align: 'center'
        },
        {
            id: 'price_cny',
            label: t("my_home.price"),
            minWidth: 60,
            align: 'center'
        }
    ];
    const handleSelect = (event: React.MouseEvent<unknown>, url: string) => {
        const selectedIndex = selected.indexOf(url);
        let newSelected: string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, url);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
        setSelected(newSelected);
      };

      const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelected = items.map((n) => n.item_url);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
      };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer>
                <Table
                    // sx={{ minWidth: 600 }}
                    aria-labelledby="tableTitle"
                    size='medium'
                >
                    <TableHead>
                    <TableRow>
                        {headCells.map((column, index) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                    minWidth: column.minWidth,
                                    position: index === 0 ? "sticky" : undefined,
                                    left: index === 0 ? 0 : undefined,
                                    zIndex: index === 0 ? 99 : 0,
                                    top: '-1px',
                                    padding: '8px'
                                }}
                            >
                            {index === 0 ? <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < items.length}
                                        checked={items.length > 0 && items.length === selected.length}
                                        onChange={handleSelectAll}
                                        inputProps={{
                                        'aria-label': 'select all items',
                                        }}
                                    /> : column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, index) => {
                            const isItemSelected = isSelected(row.item_url);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleSelect(event, row.item_url)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.name}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell align="center" padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="left" sx={{ padding: '0.5rem' }}><img src={row.img_url} alt={row.item_name} width="50" /></TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.item_name}
                                    </TableCell>
                                    <TableCell align="center" padding="none">{row.price_cny}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
