import Navbar from "./Components/Navbar"  
import Dashboard from "./Components/Dashboard"
import Workouts from "./Pages/Workouts"
import WorkoutDetail from "./Pages/WorkoutDetail"
import Nutrirtion from "./Pages/Nutrition"
import Progress from "./Pages/Progress"
import Coach from "./Pages/Coach"
import { useEffect, useState } from "react"


const API = 'http://localhost:3001'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [workout, setWorkout] = useState<any[]>([])
  const [meal, setMeal] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
})
  const [messages, setMessages] = useState([{
        role: 'assistant', content: 'Hey! I am your AI fitness coach. Ask me anything about workouts, nutrition, or recovery!'
    }])
   /*
        - useEffect() solves the issue of rerendering with every state change
        - For example, fetching workouts from the backend. You only want to do that once when the app loads, not every time any piece of state changes.
   */
   useEffect(() => {
        /*
            fetch is the browser's built-in tool for making HTTP requests. Same concept as what Postman was doing
        */
        async function fetchWorkouts() {
            try{
                const res = await fetch(`${API}/workouts`)
                const data = await res.json()
                setWorkout(data)
            } catch (error){
                console.log('Failed to fetch workouts:', error)
            }
        }
        fetchWorkouts()
   }, [])

   useEffect(() => {
    async function fetchMeals() {
        try {
            const res = await fetch(`${API}/meals`)
            const data = await res.json()
            setMeal(data)
        } catch (error) {
            console.error('Failed to fetch meals:', error)
        }
    }
    fetchMeals()
   }, [])


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
            onDelete = {async() => {
                try{
                    await fetch(`${API}/workouts/${selectedWorkout.id}`, {
                        method: 'DELETE'
                    })
                    setWorkout((prev: any[]) => prev.filter(w => w.id !== selectedWorkout?.id))
                    setCurrentPage('workouts')
                }catch (error){
                    console.error('Failed to delete workout:', error)
                }
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
            <Coach messages={messages} setMessages={setMessages}/>
        }
      <Navbar currentPage = {currentPage} onNavigate = {setCurrentPage}/>
    </div>
  )
}

export default App