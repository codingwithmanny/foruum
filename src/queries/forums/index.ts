// Imports
// ========================================================
import request from '../../utils/request';

// Requests
// ========================================================
const Forums = {
  find: (domain: string, address?: string) => {
    return request({
      url: `/forums/${domain}${address ? `?id=${address}` : ''}`,
      method: 'GET',
    });
  },
  list: (address?: string | null) => {
    return request({
      url: `/forums?id=${address}`,
      method: 'GET',
    });
  },
  create: (name: string, address: string) => {
    return request({
      url: `/forums`,
      method: 'POST',
      data: {
        name,
        accountId: address,
      },
    });
  },
  read: (id: string) => {
    return request({
      url: `/forums/${id}`,
      method: 'GET',
    });
  },
  update: () => {},
  delete: () => {},
};

// Exports
// ========================================================
export default Forums;
