import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CardPayment from './components/CardPayment';
import Prompt from './pages/Pompt';
import PromptResult from './pages/PromptResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<CardPayment />} />
        <Route path ="/prompt" element={<Prompt />} />
        <Route path = "/prompt-result" element={<PromptResult resultType="" resultContent="" />} />
      </Routes>
    </Router>
  );
}

export default App;
