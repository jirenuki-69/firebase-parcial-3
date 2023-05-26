import { api } from '../service/api';
import { showToast } from '../../helpers/constants';

type SaleCardResult = {
  onSaleDeleteIconPress: (saleId: any) => void;
};

type Props = {
  getSales: () => void;
};

const useSaleCard = ({ getSales }: Props): SaleCardResult => {
  const onSaleDeleteIconPress = async (saleId: any) => {
    console.log(saleId);
    try {
      await api.delete(`/sales/${saleId}`);

      getSales();
      showToast('Sale Deleted');
    } catch (error) {
      showToast('Server Error');
    }
  };

  return {
    onSaleDeleteIconPress
  };
};

export default useSaleCard;
