import { useEffect, useState } from "react";
import { ProductApi } from '../api/products';

export const useProductHook = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const result = await ProductApi.getAll();
                setProducts([...result]);
            } catch(error) {
                setProducts([]);
                setError(error.toString());
            }
        })()
    }, []);

    return {
        products,
        setProducts,
        error
    }
}