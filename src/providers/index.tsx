// Imports
// ========================================================
import { BrowserRouter } from "react-router-dom";
import UserWallet from './userWallet';
import Query from './query';

// All Routes
// ========================================================
const RootProviders: React.FC = ({ children }) => {
  return <div>
    <BrowserRouter>
      <UserWallet>
        <Query>
          {children}
        </Query>
      </UserWallet>
    </BrowserRouter>
  </div>
}

// Exports
// ========================================================
export default RootProviders;