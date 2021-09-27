// Imports
// ========================================================
import { Switch, Route, Redirect } from 'react-router-dom'
import { useUserWallet } from '../providers/userWallet';

// Pages
import LandingPage from '../pages/Landing';
import ForuumsPage from '../pages/Foruums';
import ForuumPage from '../pages/Foruum';

// All Routes
// ========================================================
const Routes = () => {
  // State / Props
  const { address } = useUserWallet();

  // Render
  return <div>
    <Switch>
      <Route path="/" exact render={() => address ? <Redirect to="/foruums" /> : <LandingPage />} />
      <Route path="/foruums" exact render={() => !address ? <Redirect to="/" /> : <ForuumsPage />} />
      <Route path="/foruums/:id" exact render={() => !address ? <Redirect to="/" /> : <ForuumPage />} />
      <Route path="*" render={() => <p>404</p>} />
    </Switch>
  </div>
}

// Exports
// ========================================================
export default Routes;