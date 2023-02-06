import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {Backdrop, CircularProgress, AlertTitle} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from "react-i18next";

interface Column {
    id: 'weight' | 'ems' | 'air' | 'epacket' | 'boat';
    label: string;
    minWidth?: number;
    align?: 'right';
}

interface Data {
    weight: number;
    ems: number;
    air: number;
    epacket: number | null;
    boat: number;
}

function createData(weight: number, rate: number): Data {
    var ems: number;
    var air: number;
    var epacket: number | null = null;
    var boat: number;
    boat = Math.ceil((400 * Math.ceil(weight / 1000) + 1400 + 80) * rate * 0.01);
    if (weight <= 500) {
        ems = Math.ceil((1450 + 80) * rate * 0.01);
        air = Math.ceil((700 * Math.ceil(weight / 1000) + 1350 + 80) * rate * 0.01);
        epacket = Math.ceil((90 * Math.ceil(weight / 100) + 600 + 40) * rate * 0.01);
    } else if (weight <= 1000) {
        ems = Math.ceil((150 * Math.ceil((weight - 500) / 100) + 1450 + 80) * rate * 0.01);
        air = Math.ceil((700 * Math.ceil(weight / 1000) + 1350 + 80) * rate * 0.01);
        epacket = Math.ceil((90 * Math.ceil(weight / 100) + 600 + 40) * rate * 0.01);
    } else if (weight <= 2000) {
        ems = Math.ceil((300 * Math.ceil((weight - 1000) / 250) + 2200 + 80) * rate * 0.01);
        air = Math.ceil((700 * Math.ceil(weight / 1000) + 1350 + 80) * rate * 0.01);
        epacket = Math.ceil((90 * Math.ceil(weight / 100) + 600 + 40) * rate * 0.01);
    } else if (weight <= 6000) {
        ems = Math.ceil((500 * Math.ceil((weight - 2000) / 500) + 3400 + 80) * rate * 0.01);
        air = Math.ceil((700 * Math.ceil(weight / 1000) + 1350 + 80) * rate * 0.01);
    } else if (weight <= 10000) {
        ems = Math.ceil((800 * Math.ceil((weight - 6000) / 1000) + 7400 + 80) * rate * 0.01);
        air = Math.ceil((700 * Math.ceil(weight / 1000) + 1350 + 80) * rate * 0.01);
    } else {
        ems = Math.ceil((800 * Math.ceil((weight - 6000) / 1000) + 7400 + 80) * rate * 0.01);
        air = Math.ceil((500 * Math.ceil((weight - 10000) / 1000) + 8350 + 80) * rate * 0.01);
    }

    return { weight, ems, air, epacket, boat };
}

export default function ShippingPrice() {
    const [rows, setRows] = React.useState<Data[]>([]);
    const [errmsg, setErrmsg] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const { t } = useTranslation();
    var rate: number;
    const columns: Column[] = [
        { id: 'weight', label: t("shipping_price.weight"), minWidth: 80 },
        { id: 'ems', label: t("shipping_price.ems"), minWidth: 80, align: 'right' },
        {
            id: 'air',
            label: t("shipping_price.air"),
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'epacket',
            label: t("shipping_price.epacket"),
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'boat',
            label: t("shipping_price.boat"),
            minWidth: 80,
            align: 'right',
        },
    ];
    React.useEffect(() => {
        setErrmsg("");
        setLoading(true);
        fetch("http://agonize.asuscomm.com:3000/getRate", {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) {
                throw Error(`${response.status} ${response.statusText}`)
            }
            return response.json();
        })
            .then((data) => {
                // setRate(data.rate);
                rate = data.rate;
                var tmp: Data[] = [];
                var i: number;
                for (i = 100; i <= 2000; i = i + 50) {
                    tmp.push(createData(i, rate));
                };
                for (i = 2500; i <= 6000; i = i + 500) {
                    tmp.push(createData(i, rate));
                };
                for (i = 7000; i <= 30000; i = i + 1000) {
                    tmp.push(createData(i, rate));
                };
                console.log(tmp);
                setRows(tmp);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setErrmsg(err.message);
            })
    }, [])
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1,
            alignItems: "center"
        }}>
            {errmsg && <Alert
                severity='error'
                sx={{
                    width: "100%",
                    maxWidth: '376px'
                }}>
                <AlertTitle>Error</AlertTitle>
                {errmsg}
            </Alert>}
            {!errmsg && !loading && <Paper sx={{
                width: '100%',
                maxWidth: 1000,
                height: '100%'
            }}>
                <TableContainer sx={{
                    height: "calc(100vh - 96px)"
                }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            position: index === 0 ? "sticky" : undefined,
                                            left: index === 0 ? 0 : undefined,
                                            zIndex: index === 0 ? 99 : 0
                                        }}
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
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        background: "white",
                                                        position: column.id === "weight" ? "sticky" : undefined,
                                                        left: column.id === "weight" ? 0 : undefined
                                                    }}
                                                    component={column.id === "weight" ? "th" : "td"}
                                                    scope={column.id === "weight" ? "row": undefined}>
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
            </Paper>}
            <Backdrop sx={{color:"#fff",zIndex: (theme) => theme.zIndex.drawer+1}} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}