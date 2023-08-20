import { forwardRef } from 'react';
import { 
    Stack,
    Snackbar,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Notification = ({ 
    employee, 
    data,
    openNoti, 
    onClose
}) => {

    return (
        <>
            <Stack
                spacing={2}
                sx={{ width: '100%' }}>
                <Snackbar
                    open={openNoti}
                    autoHideDuration={3000}
                    onClose={onClose}>
                        <Alert
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => onClose}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                          sx={{ mb: 2 }}
                          severity="success">
                            <h3>
                                Employee : { employee }
                            </h3>
                            <div>
                                { data }
                            </div>
                        </Alert>
                </Snackbar>
            </Stack>
        </>
    )
}

export default Notification;