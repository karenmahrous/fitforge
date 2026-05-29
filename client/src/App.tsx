import Navbar from "./Components/Navbar"  
import Dashboard from "./Components/Dashboard"
import Workouts from "./Pages/Workouts"
import WorkoutDetail from "./Pages/WorkoutDetail"
import { useState } from "react"

const initialWorkout = [
        {
            id: 1,
            name: 'Push Day',
            date: '2026-05-27',
            exercises: [
                {name: 'Bench Press', sets: 4, reps: 10},
                {name: 'Shoulder Press', sets: 3, reps: 12},
                {name: 'Tricep Pushdown', sets: 3, reps: 15},
            ]
        },
        {
            id: 2,
            name: 'Pull Day',
            date: '2026-05-27',
            exercises: [
                {name: 'Bench Press', sets: 4, reps: 10},
                {name: 'Shoulder Press', sets: 3, reps: 12},
                {name: 'Tricep Pushdown', sets: 3, reps: 15},
            ]
        },
  ]

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [workout, setWorkout] = useState(initialWorkout)

  return (
    <div style={{ backgroundColor: '#2d0a1a', minHeight: '100vh' }}>
      {currentPage === 'home' && <Dashboard />}
      {currentPage === 'workouts' && (
                <Workouts 
                    workouts = {workout}
                    setWorkouts = {setWorkout}
                    onSelectWorkout={(workout: any) => {
                        setSelectedWorkout(workout)
                        setCurrentPage('workoutDetail')
                    }} 
                />
      )}
      {currentPage === 'workoutDetail' && 
        <WorkoutDetail 
            workout = {selectedWorkout} 
            onBack = {() => setCurrentPage('workouts')}
            onDelete = {() => {
                setWorkout(workout.filter(w => w.id !== selectedWorkout?.id))
                setCurrentPage('workouts')
            }}
        />}
      <Navbar currentPage = {currentPage} onNavigate = {setCurrentPage}/>
    </div>
  )
}

export default App