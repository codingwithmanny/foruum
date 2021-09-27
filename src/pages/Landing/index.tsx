// Imports
// ========================================================
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
// import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { useMutation } from 'react-query';
import { useUserWallet } from '../../providers/userWallet';
import Accounts from '../../queries/accounts';

// Config
// ========================================================
/**
 * 
 */
const re = /^0x[a-fA-F0-9]{40}$/;

/**
 * 
 */
let _provider: any = null;

/**
 * 
 */
let _signer: any = null;

/**
 * 
 */
const providerOptions = {
};

// Page
// ========================================================
const LandingPage = () => {
  // State / Props
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const { address, updateAddress } = useUserWallet()

  // Requests
  const { data, mutate } = useMutation(async ({ address }: { address: string }) => Accounts.create(address))

  // Functions
  /**
   * 
   */
  const getAccountData = async () => {
    const _web3 = new ethers.providers.Web3Provider(_provider);
    _signer = _web3.getSigner();
    const accounts = await _web3.listAccounts();
    // const { chainId } = await _web3.getNetwork();

    const selectedAccount = accounts[0];

    await mutate({ address: selectedAccount as string });
    // Check if mainnet
  }

  /**
   * 
   */
  const onClickConnectWallet = async () => {
    web3Modal?.clearCachedProvider();

    try {
      _provider = await web3Modal?.connect();
    } catch (e) {
      console.log('Could not get a wallet connection', e);
      return;
    }

    // // Subscribe to accounts change
    // _provider.on('accountsChanged', (accounts: string) => {
    //   fetchAccountData();
    // });

    // // Subscribe to chainId change
    // _provider.on('chainChanged', (chainId: string) => {
    //   fetchAccountData();
    // });

    // // Subscribe to networkId change
    // _provider.on('networkChanged', (networkId: string) => {
    //   setNetworkError(false);
    //   fetchAccountData();
    // });

    // Get account data
    await getAccountData();
  }

  // Hooks
  /**
   * 
   */
  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: false, // optional
      providerOptions, // required
    });
    setWeb3Modal(web3Modal);
  }, [])

  /**
   * 
   */
  useEffect(() => {
    if (!data?.id) return;
    updateAddress(data.id);
  }, [data])

  // Render
  return <div>
    <h1>Welcome</h1>
    {!address
      ? <button onClick={onClickConnectWallet}>Connect Wallet</button>
      : <div>
        <p>Wallet Connect</p>
        <pre><code>{JSON.stringify(address, null, ' ')}</code></pre>
        <p>Valid Wallet Address:</p>
        <pre><code>{JSON.stringify(re.test(address))}</code></pre>
      </div>}
  </div>
}

// Exports
// ========================================================
export default LandingPage;