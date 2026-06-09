import Navbar from "./Components/Navbar"  
import Dashboard from "./Components/Dashboard"
import Workouts from "./Pages/Workouts"
import WorkoutDetail from "./Pages/WorkoutDetail"
import Nutrirtion from "./Pages/Nutrition"
import Progress from "./Pages/Progress"
import Coach from "./Pages/Coach"
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

const initialMeal = {
    breakfast: [{
        id: 1, 
        name: 'Oatmeal',
        calories: '280',
        protein: '10',
        carbs: '45',
        fat: '5'
    },
    {
        id: 2, 
        name: 'Oatmeal',
        calories: '280',
        protein: '10',
        carbs: '45',
        fat: '5'
    }
    ],

    lunch: [{
        id: 3, 
        name: 'Chicken Rice Bowl',
        calories: '520',
        protein: '40',
        carbs: '55',
        fat: '10'
    }],

    dinner: [],
    snacks: []
}
function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [workout, setWorkout] = useState(initialWorkout)
  const [meal, setMeal] = useState(initialMeal)

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
            workouts = {workout}
            setWorkouts = {setWorkout}
        />}
        {currentPage === 'nutrition' &&
            <Nutrirtion meal = {meal} setMeal={setMeal}/>
        }
        {currentPage === 'progress' &&  
            <Progress workouts={workout} />
        }
        {currentPage === 'coach' &&  
            <Coach />
        }
      <Navbar currentPage = {currentPage} onNavigate = {setCurrentPage}/>
    </div>
  )
}

export default App