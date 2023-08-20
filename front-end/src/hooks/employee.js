import { useEffect, useState } from "react";
import { EmployeeApi } from '../api/employees';

export const useEmployeeHook = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const result = await EmployeeApi.getAll();
                setEmployees([...result]);
            } catch(error) {
                setEmployees([]);
                setError(error.toString());
            }
        })()
    },[]);
    return {
        employees,
        setEmployees,
        error
    }
}