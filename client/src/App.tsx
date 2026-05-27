import Navbar from "./Components/Navbar"  
import Dashboard from "./Components/Dashboard"

function App() {
  return (
    <div style={{ backgroundColor: '#2d0a1a', minHeight: '100vh' }}>
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default App