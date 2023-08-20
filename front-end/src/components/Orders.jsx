import { useState, useMemo, useEffect, forwardRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Container,
    Button,
    TextField,
    TablePagination,
    Modal,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    IconButton,
    SvgIcon
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

import { useOrderHook } from '../hooks/order';
import { useProductHook } from '../hooks/product';
import { useEmployeeHook } from '../hooks/employee';

import { OrderApi } from '../api/orders';

const Orders = ({ emId, cusId, setNotiMsg, setOpenNoti, sendMsg }) => {
    const [employeeId, setEmployeeId] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [orderData, setOrderData] = useState([]);
    const [productData, setProductData] = useState([]);
    
    const [proId, setProId] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [comment, setComment] = useState('');

    const [open, setOpen] = useState(false);

    const [updateFlag, setUpdateFlag] = useState(false);
    const [updateId, setUpdateId] = useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '');

   useEffect(() => {
        setEmployeeId(emId);
        setCustomerId(cusId);
    }, []);

    const { orders, setOrders, orderError } = useOrderHook(employeeId, customerId);
    const { products, setProducts, productError } = useProductHook();
    const { employees } = useEmployeeHook();
    const navigate = useNavigate();

   

    useEffect(() => {
        setOrderData(orders);
        setProductData(products);
    }, [orders, products]);

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
        setPage(0);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleCreateModalOpen = () => {
        setUpdateFlag(false);
        setProId(null);
        setQuantity(0);
        setOpen(true);
    }

    const createOrder = async () => {
        setOpen(false);
        const orderData = {
            productId: proId,
            quantity: quantity
        }
        const orders = await OrderApi.addOrder(employeeId, customerId, orderData);

        broadCastOrderMgs();
        // setOrderData(orders)
    }

    const onUpdateOrder = async () => {
        const { productId } = orderData.filter(item => item.id == updateId)[0];
        
        const data = {
            "productId": productId,
            "quantity": quantity
        }
        const result = await OrderApi.updateOrder(updateId, data);
        // const orders = await OrderApi.getAll(employeeId, customerId);
        // // orders = await OrderApi.getAll(employeeId, customerId);
        
        setOrderData(await OrderApi.getAll(employeeId, customerId));
        // if(result.status == "200")
            setOpen(false);
    }

    const broadCastOrderMgs = () => {
        let fullName = "";
        let productName = "";
        employees.map(employee => {
            if(employee.id == emId) 
                fullName = `${employee.firstName} ${employee.lastName}`;
        });
        productData.map(product => {
            if(product.id == proId)
                productName = product.name
        });
        
        const msg = {
            employeeId: emId,
            employee: fullName,
            data: `Product : ${productName}, Quantity : ${quantity} ordered`
        };

        // setNotiMsg(msg);
        sendMsg(msg);
        // setOpenNoti(true);
    }


    const onHandleUpdateClick = id => {
        setUpdateFlag(true);
        const {productId, quantity} = orderData.filter(item => item.id == id)[0];
        setProId(productId);
        setQuantity(quantity*1);
        setUpdateId(id);
        setOpen(true);
    }

    const onDeleteOrder = async id => {
        try {
            const orders = await OrderApi.deleteOrder(employeeId, customerId, id);
            setOrders(orders);
        } catch(error) {
            console.log(error);
        }
    }

    const columns = [
        {
            id: 0,
            width: 20,
            label: 'No',
            dataKey: 'number'
        },
        {
            id: 1,
            width: 100,
            label: 'Product',
            dataKey: 'product'
        },
        {
            id: 2,
            width: 100,
            label: 'Quantity',
            dataKey: 'quantity',
            numeric: true,
        },
        {
            id: 3,
            width: 130,
            label: 'Action',
            dataKey: 'action'
        }
    ];

    const modalStyles = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    }
    
    const filterData = useMemo(() => {
        return orderData.filter(order => {
                    let searchName = "";
                    productData.map(product => {
                        product.id == order.productId ? searchName = product.name : "";
                    })

                return !search || searchName.includes(search)})
        
    }, [orderData, search]);
    

    const handleCommentSubmit = () => {
        let fullName = '';
        employees.map(employee => {
            if(employee.id == emId) 
                fullName = `${employee.firstName} ${employee.lastName}`;
        });

        const msg = {
            employeeId: emId,
            employee: fullName,
            data: `Comment : ${comment}`
        }
        
        sendMsg(msg);
        // setOpenNoti(true);
    }

    return (
        <>
            <Container
                maxWidth="lg"
                className='mt-3 p-4'
                sx={{ height: '100vh' }}>
                <div className='flex flex-row justify-between items-center mb-3 p-2'>
                    <h1>
                        Order Information
                    </h1>
                    <div>
                        <Button
                          startIcon={(
                            <SvgIcon fontSize="small">
                              <PlusIcon />
                            </SvgIcon>
                          )}
                          variant="contained"
                          onClick={handleCreateModalOpen}
                          sx={{ marginRight: '10px' }}>
                          Add Order
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={() => {
                                navigate('/customers');
                            }}
                            color='info'>
                            Back
                        </Button>
                    </div>
                </div>
                <div className='p-2 mb-3'>
                    <TextField
                        id="search"
                        label="Search order"
                        variant='outlined'
                        onChange={event => setSearch(event.target.value)}
                        fullWidth/>
                </div>
                <Paper className='p-2 mb-3'>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {
                                        columns.map(column => (
                                            <TableCell
                                                key={column.id}
                                                align='center'
                                                style={{minWidth: column.width}}>
                                                { column.label }
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { filterData && filterData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((order, index) => {
                                        return (
                                            <TableRow key={order.id}>
                                                <TableCell align='center'>
                                                    { index + 1 }
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {
                                                        productData
                                                            .filter(data => data.id == order.productId)[0]
                                                            .name
                                                    }
                                                </TableCell>
                                                <TableCell align='center'>
                                                    { order.quantity }
                                                </TableCell>
                                                <TableCell 
                                                    align='center'
                                                    className='flex flex-row justify-evenly items-center'>
                                                    <Button 
                                                        variant='contained' 
                                                        color="warning"
                                                        style={{marginRight: '10px'}}
                                                        onClick={() => onHandleUpdateClick(order.id)}>
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        variant='contained' 
                                                        color="error"
                                                        onClick={() => onDeleteOrder(order.id)}>
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
                        count={orderData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}/>
                </Paper>
                <div className='flex flex-row justify-between items-center p-2 mb-3'>
                    <TextField
                        id="search"
                        label="Comment"
                        sx={{     
                            width: '-webkit-fill-available',
                            marginRight: '10px'
                        }}
                        value={comment}
                        onChange={event => {
                            setComment(event.target.value)
                        }}
                        variant='outlined'/>
                    <Button
                        variant="contained"
                        onClick={handleCommentSubmit}
                        color='info'>
                        Submit
                    </Button>
                </div>
                <Modal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}>
                        <Box sx={{...modalStyles, width: '30vw', padding: '0'}}>
                            <Typography
                                className='bg-gray-300 p-4 mb-3 border-b-0 border-gray-800 bold'>
                                Create Order
                            </Typography>
                            <div className='flex flex-col justify-start w-full p-3'>
                                <FormControl 
                                    size='small'
                                    className=''>
                                    <InputLabel id="product-select-label">
                                        Products
                                    </InputLabel>
                                    <Select
                                        labelId='product-select-label'
                                        className='p-2 mb-3'
                                        id='product-select'
                                        value={proId}
                                        label="Products"
                                        onChange={event => {
                                            setProId(event.target.value)
                                        }}>
                                            {
                                                products.map(product => (
                                                    <MenuItem 
                                                        key={product.id}
                                                        value={product.id}>
                                                        { product.name }
                                                    </MenuItem>
                                                ))
                                            }
                                    </Select>
                                </FormControl>
                                <TextField
                                  id="quantity"
                                  className="mt-5 p-2"
                                  label="Quantity"
                                  type="number"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={quantity}
                                  onChange={event => {
                                    setQuantity(event.target.value);
                                  }}/>
                                  <div className='flex flex-row justify-between items-center mt-3 p-2'>
                                        {
                                            updateFlag ?
                                            <Button
                                                variant='contained'
                                                color='info'
                                                onClick={() => onUpdateOrder()}>
                                                Update
                                            </Button> :
                                            <Button
                                                variant='contained'
                                                color='success'
                                                onClick={() => createOrder()}>
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

export default Orders;