import { useState } from 'react';
import { api } from '../service/api';
import { showToast } from '../../helpers/constants';

type ServiceAddScreenResult = {
  onChangeService: (field: string, value: string) => void;
  addService: () => void;
};

const useServiceAddScreen = (): ServiceAddScreenResult => {
  const [service, setService] = useState<Service>({} as Service);

  const onChangeService = (field: string, value: string) => {
    setService((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const addService = async () => {
    try {
      const response = await api.post(
        `/services`,
        service
      );
      console.log(response.data);

      if (response.data.message) {
        showToast(response.data.message);
      } else {
        showToast('Service Saved');
      }
    } catch {
      showToast('Server Error');
    }
  };

  return {
    onChangeService,
    addService
  };
};

export default useServiceAddScreen;
