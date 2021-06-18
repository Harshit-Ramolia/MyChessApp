import { CircularProgress } from '@material-ui/core';
import React from 'react'

export const Fallback = () => {
        return (<CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }}/>);
}