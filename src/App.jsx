import { Router, Switch, Route } from 'wouter';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Pricing from './pages/Pricing.jsx';
import AboutFAQ from './pages/AboutFAQ.jsx';

function App() {
  return (
    <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/about" component={AboutFAQ} />
            <Route>
              <div className="not-found">
                <h1>404 — Page Not Found</h1>
                <p>Even our Air Sommeliers couldn't locate this page.</p>
                <a href="/">Go Home</a>
              </div>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;
