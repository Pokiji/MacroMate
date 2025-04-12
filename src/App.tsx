import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing.tsx';
import Home from './home.tsx'; // Import your Home component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;