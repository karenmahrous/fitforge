import Navbar from "./Components/Navbar"  
import Dashboard from "./Components/Dashboard"
import Workouts from "./Pages/Workouts"
import WorkoutDetail from "./Pages/WorkoutDetail"
import { useState } from "react"

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedWorkout, setSelectedWorkout] = useState(null)

  return (
    <div style={{ backgroundColor: '#2d0a1a', minHeight: '100vh' }}>
      {currentPage === 'home' && <Dashboard />}
      {currentPage === 'workouts' && (
                <Workouts 
                    onSelectWorkout={(workout: any) => {
                        setSelectedWorkout(workout)
                        setCurrentPage('workoutDetail')
                    }} 
                />
      )}
      {currentPage === 'workoutDetail' && <WorkoutDetail workout = {selectedWorkout} onBack = {() => setCurrentPage('workouts')}/>}
      <Navbar currentPage = {currentPage} onNavigate = {setCurrentPage}/>
    </div>
  )
}

export default App