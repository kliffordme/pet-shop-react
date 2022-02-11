import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Routes, Switch, Route, Link} from 'react-router-dom'
import StripeContainer from "./components/StripeContainer";


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
