import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: 'weight' | 'ems' | 'air' | 'epacket' | 'boat';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

const columns: Column[] = [
    { id: 'weight', label: '重量(g)', minWidth: 100 },
    { id: 'ems', label: 'EMS', minWidth: 100, align: 'right'},
    {
      id: 'air',
      label: '航空便',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'epacket',
      label: 'E邮宝',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'boat',
      label: '船运',
      minWidth: 100,
      align: 'right',
    },
  ];

interface Data {
    weight: number;
    ems: number;
    air: number;
    epacket: number|null;
    boat: number;
  }

function createData(weight: number): Data {
    var ems:number;
    var air:number;
    var epacket:number|null=null;
    var boat:number;
    boat=400*Math.ceil(weight/1000)+1400;
    if(weight <= 500) {
        ems=1450;
        air=700*Math.ceil(weight/1000)+1350;
        epacket=90*Math.ceil(weight/100)+600;
    } else　if(weight <= 1000) {
        ems=150*Math.ceil((weight-500)/100)+1450;
        air=700*Math.ceil(weight/1000)+1350;
        epacket=90*Math.ceil(weight/100)+600;
    }else if(weight <=2000) {
        ems=300*Math.ceil((weight-1000)/250)+2200;
        air=700*Math.ceil(weight/1000)+1350;
        epacket=90*Math.ceil(weight/100)+600;
    }else if(weight <=6000) {
        ems=500*Math.ceil((weight-2000)/500)+3400;
        air=700*Math.ceil(weight/1000)+1350;
    } else if(weight <=10000){
        ems=800*Math.ceil((weight-6000)/1000)+7400;
        air=700*Math.ceil(weight/1000)+1350;
    }else {
        ems=800*Math.ceil((weight-6000)/1000)+7400;
        air=500*Math.ceil((weight-10000)/1000)+8350;
    }
    
    return { weight, ems, air, epacket, boat };
  }

export default function ShippingPrice(){
    const [rows, setRows]=React.useState<Data[]>([]);
    return (
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={1}>
                    空
                  </TableCell>
                  <TableCell align="center" colSpan={4}>
                    种类
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.weight}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      );
}