// Imports
// ========================================================
import request from '../../utils/request';

// Requests
// ========================================================
const Accounts = {
  list: () => {},
  create: (id: string) => {
    return request({
      url: `/accounts`,
      method: 'POST',
      data: {
        address: id,
      },
    });
  },
  read: (id: string) => {
    return request({
      url: `/accounts/${id}`,
      method: 'GET',
    });
  },
  update: () => {},
  delete: () => {},
};

// Exports
// ========================================================
export default Accounts;
