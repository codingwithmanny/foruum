// Imports
// ========================================================
import request from '../../utils/request';

// Requests
// ========================================================
const Threads = {
  list: (forumId: string, address?: string) => {
    return request({
      url: `/forums/${forumId}/threads${address ? `?id=${address}` : ''}`,
      method: 'GET',
    });
  },
  create: (
    name: string,
    description: string,
    forumId: string,
    address: string,
  ) => {
    return request({
      url: `/forums/${forumId}/threads`,
      method: 'POST',
      data: {
        name,
        description,
        forumId,
        accountId: address,
      },
    });
  },
  read: () => {},
  update: () => {},
  delete: () => {},
};

// Exports
// ========================================================
export default Threads;
