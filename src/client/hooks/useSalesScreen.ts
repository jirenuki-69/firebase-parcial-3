import { useState, useEffect } from 'react';
import { api } from '../service/api';

type SalesScreenResult = {
  sales: any[];
  getSales: () => void;
};

const useSalesScreen = (): SalesScreenResult => {
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    const response = await api.get('/sales');
    setSales(response.data);
  };

  useEffect(() => {
    getSales();
  }, []);

  return {
    sales,
    getSales
  };
};

export default useSalesScreen;
