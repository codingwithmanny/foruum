// Imports
// ========================================================
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from "react-query";
import { useUserWallet } from "../../providers/userWallet";
import Forums from "../../queries/forums";

// Page
// ========================================================
const ForuumsPage = () => {
  // State / Props
  const [forum, setForum] = useState('');
  const { address, updateAddress } = useUserWallet();

  // Request
  const { data, mutate: mutateList, isLoading } = useMutation(async ({ address }: { address: string }) => Forums.list(address))
  const { mutate: mutateCreate } = useMutation(async ({ name, address }: { name: string, address: string }) => Forums.create(name, address), {
    onSuccess: async () => {
      mutateList({ address: address as string })
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
  const onChangeForumName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForum(event.target.value);
  }

  /**
   * 
   * @param event 
   */
  const onSubmitForum = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForum('');
    await mutateCreate({ name: forum, address: `${address}` });
  }

  // Hooks
  useEffect(() => {
    if (!address) return;
    const init = async () => {
      await mutateList({ address });
    }
    init();
  }, [])

  // Render
  return <div>
    <button onClick={onClickLogOut}>Log Out</button>
    <h1>Foruums Page</h1>
    <p>{address}</p>
    <p>{`${import.meta.env.VITE_SERVER}`}</p>
    <div>
      {isLoading
        ? 'LOADING'
        : <div>
          {data && data?.length === 0
            ? <p>Looks like you aren't part of any forums</p>
            : (<div>
              <h4>Forums part of:</h4>
              <table style={{ border: '1px solid #efefef', width: '100%' }}>
                <tbody>
                  {data && data.map((i: any, key: number) => <tr key={`foruum-${key}`}>
                    <th style={{ border: '1px solid #efefef', padding: '8px', textAlign: 'left' }}>{i?.name}</th>
                    <td style={{ border: '1px solid #efefef', padding: '8px', textAlign: 'right' }}><Link to={`/foruums/${i?.domain}`}>View</Link></td>
                  </tr>)}
                </tbody>
              </table>
            </div>)}
          <form onSubmit={onSubmitForum}>
            <p><input value={forum} onChange={onChangeForumName} type="text" placeholder="Forum name" /></p>
            <button type="submit">Create New Forum</button>
          </form>
        </div>}
    </div>
  </div>
}

// Exports
// ========================================================
export default ForuumsPage;