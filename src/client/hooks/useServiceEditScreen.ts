import { useState } from 'react';
import { api } from '../service/api';
import { showToast } from '../../helpers/constants';
import { NavigationScreenProp } from 'react-navigation';

type ServiceEditScreenResult = {
  onChangeService: (field: string, value: string) => void;
  updateService: () => void;
  deleteService: (navigation: NavigationScreenProp<any, any>) => void;
};

const useServiceEditScreen = ({
  service
}: {
  service: Service;
}): ServiceEditScreenResult => {
  const [editableService, setEditableService] = useState(service);

  const onChangeService = (field: string, value: string) => {
    setEditableService((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateService = async () => {
    try {
      const response = await api.put(
        `/services/${editableService._id}`,
        editableService
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

  const deleteService = async (navigation: NavigationScreenProp<any, any>) => {
    try {
      const response = await api.delete(`/services/${editableService._id}`);
      console.log(response.data);

      showToast(response.data.message);
      navigation.goBack();
    } catch {
      showToast('Server Error');
    }
  };

  return {
    onChangeService,
    updateService,
    deleteService
  };
};

export default useServiceEditScreen;
