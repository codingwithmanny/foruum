// Imports
// ========================================================
import React, { useState, createContext, useContext, useEffect } from 'react';

// Types
interface UserWallerProviderTypes {
  children: React.ReactNode;
}

interface WalletContextState {
  address: string | null | undefined;
  updateAddress: (value: string | null) => void;
}

// Provider
// ========================================================
/**
 * 
 */
export const UserWalletContext = createContext<WalletContextState | null>(null);

// Provider
// ========================================================
/**
 * 
 * @param param0 
 * @returns 
 */
const UserWalletProvider = ({ children }: UserWallerProviderTypes) => {
  // State / Props
  const [address, setAddress] = useState(() => {
    return localStorage.getItem('address') || '';
  });

  // Functions
  /**
   * 
   * @param value 
   */
  const updateAddress = (value: string | null) => {
    if (!value) {
      setAddress('')
    };

    setAddress(value as string);
  }

  // Hooks
  useEffect(() => {
    if (!address) {
      localStorage.removeItem('address');
      return;
    }
    localStorage.setItem('address', address);
  }, [address]);

  // Render
  return <UserWalletContext.Provider
    value={{
      address,
      updateAddress
    }}
  >
    {children}
  </UserWalletContext.Provider>
};

// Hook
// ========================================================
/**
 * 
 * @returns 
 */
export const useUserWallet = () => {
  const context = useContext(UserWalletContext);
  if (!context) {
    throw new Error(
      'Components using UserWalletContext must be rendered within the UserWallerProvider',
    );
  }
  return context;
};

// Exports
// ========================================================
export default UserWalletProvider;