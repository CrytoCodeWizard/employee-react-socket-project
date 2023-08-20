import { useEffect, useState } from 'react';
import { OrderApi } from '../api/orders';

export const useOrderHook = (employeeId, customerId) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [empId, setEmpId] = useState(0);
    const [custId, setCustId] = useState(0);

    useEffect(() => {
        setEmpId(employeeId);
        setCustId(customerId);
    });

    useEffect(() => {
        (async () => {
            try {
                const result = await OrderApi.getAll(employeeId, customerId);
                setOrders([...result]);
            } catch(error) {
                setOrders([]);
                setError(error.toString())
            }
        })()
    }, [empId, custId]);

    return {
        orders,
        error,
        setOrders
     }
}