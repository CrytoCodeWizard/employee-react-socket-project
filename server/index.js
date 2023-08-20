const express = require('express');
const server = express();

const cors = require('cors');

// routers
const customers = require('./router/customers');
const orders = require('./router/orders');
const products = require('./router/products');
const employees = require('./router/employees');

server.use(express.json());
server.use(cors());

// router use middleware
server.use('/customers/', customers);
server.use('/orders/', orders);
server.use('/products/', products);
server.use('/employees/', employees);

// server run
server.listen(3001, () =>
    console.log("Server is Running in the port 3001")
);