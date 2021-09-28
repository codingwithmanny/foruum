// Imports
// ========================================================
import request from '../../utils/request';

// Requests
// ========================================================
const Messages = {
  find: (forumId: string, threadId: string, messageId: string) => {
    return request({
      url: `/forums/${forumId}/thread/${threadId}/message/${messageId}`,
      method: 'GET',
    });
  },
  list: (forumId: string, threadId: string) => {
    return request({
      url: `/forums/${forumId}/thread/${threadId}/messages`,
      method: 'GET',
    });
  },
  create: (
    content: string,
    forumId: string,
    threadId: string,
    address: string,
  ) => {
    return request({
      url: `/forums/${forumId}/thread/${threadId}/messages`,
      method: 'POST',
      data: {
        content,
        accountId: address,
      },
    });
  },
  read: () => { },
  update: () => { },
  delete: () => { },
};

// Exports
// ========================================================
export default Messages;