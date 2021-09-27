// Imports
// ========================================================
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useUserWallet } from "../../providers/userWallet";
import Forums from "../../queries/forums";
import Threads from '../../queries/threads';

// Page
// ========================================================
const ThreadPage = () => {
  // State / Props
  const [forum, setForum] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { address, updateAddress } = useUserWallet();
  const { id } = useParams<{ id: string }>();

  // Request
  const { data, mutate: mutateFind, isLoading } = useMutation(async ({ domain, address }: { domain: string, address: string | undefined }) => Forums.find(domain, address))
  const { data: threads, mutate: mutateThread } = useMutation(async ({ forumId, address }: { forumId: string, address: string | undefined }) => Threads.list(forumId, address))
  const { mutate: mutateThreadCreate } = useMutation(async ({ name, description, forumId, address }: { [key: string]: string }) => Threads.create(name, description, forumId, address), {
    onSuccess: async () => {
      await mutateThread({ forumId: data?.id, address: address as string });
    }
  })

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
  const onChangeInput = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (key === 'name') {
      setName(event.target.value);
      return;
    }
    setDescription(event.target.value);
  }

  /**
   * 
   * @param event 
   */
  const onSubmitForum = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForum('');
    await mutateThreadCreate({ name, description, forumId: data?.id, address: address as string });
  }

  // Hooks
  /**
   * 
   */
  useEffect(() => {
    if (!id) return;
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
    }
    init();
  }, [data]);

  // Render
  return <div>
    <button onClick={onClickLogOut}>Log Out</button>
    <h1>Foruums: {data && data?.name}</h1>
    <Link to="/foruums">Back</Link>
    <h3>Threads:</h3>
    {threads && threads.length === 0
      ? <p>No Threads Yet</p>
      : <table style={{ border: '1px solid #efefef', width: '100%' }}>
        <tbody>
          {threads && threads.map((i: any, key: number) => <tr key={`thread-${key}`}>
            <th style={{ border: '1px solid #efefef', padding: '8px', textAlign: 'left' }}>{i?.name}</th>
            <td style={{ border: '1px solid #efefef', padding: '8px', textAlign: 'right' }}><Link to={`/foruums/${data?.domain}/threads/${i?.id}`}>View</Link></td>
          </tr>)}
        </tbody>
      </table>}
    <form onSubmit={onSubmitForum}>
      <p><input value={name} onChange={onChangeInput('name')} type="text" placeholder="Thread name" /></p>
      <p><input value={description} onChange={onChangeInput('description')} type="text" placeholder="Thread description" /></p>
      <button type="submit">Create New Forum</button>
    </form>
  </div>
}

// Exports
// ========================================================
export default ThreadPage;