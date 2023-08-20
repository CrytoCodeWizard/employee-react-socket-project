import { useState, useEffect, forwardRef, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Container,
    Button,
    Paper,
    Typography,
    Modal,
    Box,
    TextField,
    Stack,
    IconButton,
    Snackbar,
    SvgIcon,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    TablePagination,
} from '@mui/material';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

import { useCustomerHook } from '../hooks/customer';
import { useEmployeeHook } from '../hooks/employee';
import { EmployeeApi } from '../api/employees';
import { CustomerApi } from '../api/customer';
import { SOCKET_SERVER_URL } from '../utils/config';

const CustomerLists = ({ empId, setCusId, setNotiMsg, setOpenNoti, sendMsg }) => {
    const ws = new WebSocket(SOCKET_SERVER_URL);

    const [data, setData] = useState({id: 0, firstName: "", lastName: ""});
    const {customers, error} = useCustomerHook();
    const { employees } = useEmployeeHook();
    const [open, setOpen] = useState(false);
    const [first, setFirst] = useState('');
    const [middle, setMiddle] = useState('');
    const [last, setLast] = useState('');
    const [notiMessage, setNotiMessage] = useState({});
    const [updateFlag, setUpdateFlag] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '');
    
    const navigate = useNavigate();

    const modalStyles = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #cfcfcf',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    }

    useEffect(() => {
        (async () => {
            try {
                const employee = await EmployeeApi.getById(parseInt(empId));
                setData(employee[0]);
            } catch(error) {
                console.log(error);
            }
        })()
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }

    const broadCastMgs = ({  firstName, middleInitial, lastName, }) => {
        let fullName = "";
        employees.map(employee => {
            if(employee.id == empId) 
                fullName = `${employee.firstName} ${employee.lastName}`;
        })
        const msg = {
            employeeId: empId,
            employee: fullName,
            data: `Customer: ${firstName} ${lastName} created`
        }

        sendMsg(msg);
    }

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert
                    elevation={6}
                    ref={ref}
                    variant="filled"
                    {...props}/>
    });

    const handleNotiClose = (event, reason) => {
        if(reason === 'clickaway')
            return;
        setOpenNoti(false);
    }

    const action = (
        <>
            <IconButton
                size='small'
                onClick={handleNotiClose}>
                <CloseIcon fontSize='small'/>
            </IconButton>
        </>
    );

    const handleCreateModalOpen = () => {
        setUpdateFlag(false);
        setFirst('');
        setMiddle('');
        setLast('');
        setOpen(true);
    }

    const createCustomer = async () => {
        setOpen(false);
        const customerData = {
            firstName: first,
            middleInitial: middle,
            lastName: last,
        }
        const customers = await CustomerApi.addCustomer(customerData);

        broadCastMgs(customerData);
    }

    const updateCustomer = async () => {
        const data = {
            firstName: first,
            middleInitial: middle,
            lastName: last
        }

        const result = await CustomerApi.updateCustomer(selectedId, data);
        setOpen(false);
    }

    const handleClick = id => {
        setCusId(id);
        navigate('/orders');
    }

    const handleUpdateModalOpen = customer => {
        setUpdateFlag(true);
        setSelectedId(customer.id)
        setFirst(customer.firstName);
        setMiddle(customer.middleInitial);
        setLast(customer.lastName);
        setOpen(true);
    }

    const deleteCustomer = async id => {
        await CustomerApi.deleteCustomer(id);
    }
    const filterData = useMemo(() => {
        return customers.filter(customer => {
            const searchName = `${customer.firstName} ${customer.lastName}`;
                return !search || searchName.includes(search)})
    }, [customers, search]);

    return (
        <>
            <Container 
                maxWidth="lg"
                className='mt-3 p-4'
                sx={{ height: '100vh' }}>
                <Stack spacing={3}>
                    <Typography
                        align='center'
                        sx={{ fontSize: 20, fontWeight: "bold" }}
                        className='p-2 m-2'>
                        { `Employee : ${data.firstName} ${data.lastName}` }
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}>
                        <Stack spacing={1}>
                            <Typography variant="h4">
                              Customers
                            </Typography>
                        </Stack>
                        <div className='flex flex-row justify-end items-center'>
                          <Button
                            startIcon={(
                              <SvgIcon fontSize="small">
                                <PlusIcon />
                              </SvgIcon>
                            )}
                            variant="contained"
                            onClick={() => handleCreateModalOpen()}
                            sx={{ marginRight: '10px' }}>
                            Add
                          </Button>
                          <Button
                              variant='outlined'
                              onClick={() => {
                                  navigate('/login');
                              }}
                              color='info'>
                              Back
                          </Button>
                        </div>
                    </Stack>
                    <div className='p-2 mb-3'>
                        <TextField
                            id="search"
                            label="Search customers"
                            variant='outlined'
                            onChange={event => setSearch(event.target.value)}
                            fullWidth/>
                    </div>
                    <Paper className='p-2 mb-3'>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell 
                                            align='center'
                                            sx={{width: '10%'}}>
                                            No
                                        </TableCell>
                                        <TableCell 
                                            align='center'
                                            sx={{ width: '40%' }}>
                                            Name
                                        </TableCell>
                                        <TableCell 
                                            align='center'
                                            sx={{ width: '50%',textAlign:'center' }}>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { filterData && filterData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((customer, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    key={customer.id}
                                                    item xs={12} >
                                                    <TableCell
                                                        align='center'
                                                        sx={{width: '10%'}}>
                                                        { index + 1 }
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{ width: '40%' }}>
                                                        { `${customer.firstName} ${customer.lastName}` }
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{ width: '50%' }}>
                                                            <Button
                                                                variant='contained'
                                                                onClick= {() => handleClick(customer.id)}
                                                                color='success'
                                                                sx={{marginRight: '10px'}}>
                                                                View
                                                            </Button>
                                                            <Button
                                                                variant='contained'
                                                                onClick={() => handleUpdateModalOpen(customer)}
                                                                color='warning'
                                                                sx={{marginRight: '10px'}}>
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant='contained'
                                                                onClick={() => deleteCustomer(customer.id)}
                                                                color='error'
                                                                sx={{marginRight: '10px'}}>
                                                                Delete
                                                            </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={customers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}/>
                    </Paper>
                </Stack>
                <Modal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}>
                        <Box sx={{...modalStyles, width: '40vw', padding: '0'}}>
                            <Typography
                                className='bg-gray-300 p-4 mb-3 border-b-0 border-gray-800 bold'>
                                Add Customer
                            </Typography>
                            <div className='flex flex-col justify-start w-full p-3'>
                                <div className='flex flex-col justify-start w-full mb-3'>
                                    <TextField
                                        id="first-name"
                                        value={first}
                                        onChange={event => {
                                            setFirst(event.target.value)
                                        }}
                                        label="First Name"
                                        variant="outlined"
                                    />
                                </div>
                                <div className='flex flex-col justify-start w-full mb-3'>
                                    <TextField
                                        id="middle-initial"
                                        value={middle}
                                        onChange={event => {
                                            setMiddle(event.target.value)
                                        }}
                                        label="Middle Initial"
                                        variant="outlined"
                                    />
                                </div>
                                <div className='flex flex-col justify-start w-full mb-3'>
                                    <TextField
                                        id="last-name"
                                        value={last}
                                        onChange={event => {
                                            setLast(event.target.value)
                                        }}
                                        label="Last Name"
                                        variant="outlined"
                                    />
                                </div>
                                <div className='flex flex-row justify-between items-center mt-3 p-2'>
                                    {
                                        updateFlag ?
                                        <Button
                                            variant='contained'
                                            color='info'
                                            onClick={() => updateCustomer()}>
                                            Update
                                        </Button> :
                                        <Button
                                            variant='contained'
                                            color='success'
                                            onClick={() => createCustomer()}>
                                            Create
                                        </Button>
                                    }
                                    <Button 
                                        variant='contained'
                                        color='error'
                                        onClick={() => {
                                            setOpen(false);
                                        }}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </Box>
                </Modal>
            </Container>
        </>
    )
}

export default CustomerLists;