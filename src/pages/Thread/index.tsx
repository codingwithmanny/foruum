// Imports
// ========================================================
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { useUserWallet } from '../../providers/userWallet';
import Forums from '../../queries/forums';
import Messages from '../../queries/messages';
import Threads from '../../queries/threads';

// Page
// ========================================================
const ThreadPage = () => {
  // State / Props
  const [forum, setForum] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const { address, updateAddress } = useUserWallet();
  // probably makes sense to have a message list, but for now
  const [messageList, setMessageList] = useState([]);
  const { id, threadId } = useParams<{ id: string; threadId: string }>();

  // Request
  const { data, mutate: mutateFind, isLoading } = useMutation(async ({ domain, address }: { domain: string, address: string | undefined }) => Forums.find(domain, address))
  const { data: thread, mutate: mutateFindThread, isLoadingThread } = useMutation(async ({ forumId, threadId }: { forumId: string, threadId: string }) => Threads.find(forumId, threadId))
  const { data: threads, mutate: mutateThread } = useMutation(async ({ forumId, address }: { forumId: string, address: string | undefined }) => Threads.list(forumId, address))

  const { data: serverMessageList, mutate: mutateMessageList, isLoadingMessageList } = useMutation(async ({ forumId, threadId }: { forumId: string, threadId: string }) => Messages.list(forumId, threadId))
  const { mutate: mutateMessageCreate } = useMutation(async ({ content, forumId, threadId, address }: { [key: string]: string }) => Messages.create(content, forumId, threadId, address), {
    onSuccess: async () => {
      await mutateMessageList({ forumId: data?.id, threadId: threadId });
    }
  });

  // Functions
  /**
   * 
   */
  const onClickLogOut = () => {
    updateAddress(null);
  }

  /**
   * 
   * @param event 
   */
  const onSubmitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutateMessageCreate({ content, forumId: data?.id, threadId: thread.id, address: address as string });
    setContent('');
  }

  // Hooks
  /**
   * 
   */
  useEffect(() => {
    if (!id || !threadId) return;
    const init = async () => {
      await mutateFind({ domain: id, address: address as string });
    }
    init();
  }, [])

  /**
   * 
   */
  useEffect(() => {
    if (!data?.id || !address) return;
    const init = async () => {
      await mutateThread({ forumId: data?.id, address: address as string });
      await mutateFindThread({ forumId: data?.id, threadId: threadId });
      await mutateMessageList({ forumId: data?.id, threadId: threadId });
    }
    init();
    if (forum !== data.domain) {
      setForum(data.domain);
    }
  }, [data]);

  useEffect(() => {
    if (thread) {
      if (thread.name !== name) {
        setName(thread.name);
      }
      if (thread.description !== description) {
        setDescription(thread.description);
      }
    }
  }, [thread]);

  useEffect(() => {
    if (serverMessageList && messageList !== serverMessageList) {
      setMessageList(serverMessageList);
    }
  }, [serverMessageList]);

  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }

  // Render
  return <div>
    <h1>Thread Component</h1>
    <button onClick={onClickLogOut}>Log Out</button>
    <h1>Foruums: {data && data?.name}</h1>
    <Link to={`/foruums/${forum}`}>Back</Link>
    <h3>Thread:{name}</h3>
    <p>{description}</p>
    <ul>
      {messageList.map(message => <li key={`message-${message.id}`}>Message: {message.content}</li>)}
    </ul>
    <form onSubmit={onSubmitMessage}>
      <p>
        <input value={content} onChange={onChangeContent} type="text" placeholder="Type your response here" />
      </p>
      <button type="submit">Create New Response</button>
    </form>
  </div >
}

// Exports
// ========================================================
export default ThreadPage;