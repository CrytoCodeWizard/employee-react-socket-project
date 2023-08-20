import { useEffect, useState } from "react";
import { CustomerApi } from "../api/customer";

export const useCustomerHook = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const result = await CustomerApi.getAll();
                setCustomers([...result]);
            } catch(error) {
                setCustomers([]);
                setError(error.toString())
            }
        })()
    }, []);

    return {
        customers,
        error
    }
}