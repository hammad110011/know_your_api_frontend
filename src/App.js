import './App.css';
import Home from './components/Home/Home';
import Navs from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Page1 from './components/SearchPages/Page1';
import Page2 from './components/SearchPages/Page2';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navs /> {/* Navigation Bar */}
                <Routes>
                    <Route path="/" element={<Home />} /> {/* Home Page */}
                    <Route path="/home" element={<Home />} /> {/* Explicit Home route */}
                    <Route path="/search/page1" element={<Page1 />} /> {/* Page1 route */}
                    <Route path="/search/page2" element={<Page2 />} /> {/* Page2 route */}
                </Routes>
                <Footer /> {/* Footer */}
            </div>
        </Router>
    );
}

export default App;
