import * as React from 'react';
import Box from '@mui/material/Box';
import SearchBar from '../component/SearchBar'
export default function Calculator(){
    return(
        <Box 
        sx={{
            display: "flex",
            width: "100%",
            mt:1,
            justifyContent:"center"
        }}>
            <SearchBar/>
        </Box>
    )
}