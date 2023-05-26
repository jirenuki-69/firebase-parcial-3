import { useState, useEffect } from 'react';
import { api } from '../service/api';

type ServicesScreenResult = {
  services: Service[];
  getServices: () => void;
};

const useServicesScreen = (): ServicesScreenResult => {
  const [services, setServices] = useState<Service[]>([]);

  const getServices = async () => {
    const response = await api.get('/services');
    setServices(response.data);
  };

  useEffect(() => {
    getServices();
  }, [])

  return {
    services,
    getServices
  };
};

export default useServicesScreen;
