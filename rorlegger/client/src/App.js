import './App.css';
import Nav from './layouts/Nav'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import Offices from './pages/Offices'
import Articles from './pages/Articles'
import Contact from './pages/Contact'
import Routes from './routes/Routes'

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Nav/>
        </header>
        <main>
          <Routes />
        </main>
        <footer>
          
        </footer>
        </Router>
    </div>
  );
}

export default App;
