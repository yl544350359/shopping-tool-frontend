import * as React from 'react';
import Box from '@mui/material/Box';
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error:any = useRouteError();
    let errorMessage: string;
    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        // errorMessage = error.error?.message || error.statusText;
        errorMessage = error.statusText;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else {
        console.error(error);
        errorMessage = 'Unknown error';
      }
    return(
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
            <i>{errorMessage}</i>
            </p>
        </Box>
    )
}