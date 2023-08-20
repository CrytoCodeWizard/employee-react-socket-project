import { forwardRef } from "react";

import { 
    Stack,
    Snackbar,
    IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert
                elevation={6}
                ref={ref}
                variant='filled'
                {...props}
                />
});

const SendComment = ({
    employee, 
    product, 
    quantity, 
    openNoti, 
    handleNotiClose
}) => {
    const action = (
        <>
            <IconButton
                size='small'
                onClick={handleNotiClose}>
                <CloseIcon fontSize='small'/>
            </IconButton>
        </>
    );


    return (
        <>
            <Stack
                spacing={2}
                sx={{ width: '100%' }}>
                <Snackbar
                    open={openNoti}
                    autoHideDuration={3000}
                    onClose={handleNotiClose}
                    action={action}>
                    <Alert 
                        onClose={handleNotiClose}
                        severity="success"
                        sx={{ width: '100%' }}>
                        <h3>
                            Employee : { employee } Order Information
                        </h3>
                        <div>
                            Product : { product }
                        </div>
                        <div>
                            Quantity : { quantity }
                        </div>
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}

export default SendComment;