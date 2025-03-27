import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/main.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </div>
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 