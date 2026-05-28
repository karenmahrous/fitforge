import { useState } from "react";

function Workouts({onSelectWorkout} : {onSelectWorkout : (workout : any) => void}){
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
    const [workout, setWorkout] = useState(initialWorkout)

    
    return(
        <div style = {{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '30px',
        }}>
            {workout.map(workouts =>
                <div onClick={() => onSelectWorkout(workouts)} 
                    key = {workouts.id} 
                    style = {{
                        background: '#3f2e2e',
                        borderRadius: '13px',
                        display: 'flex',
                        flexDirection : 'column', 
                        padding: '16px',
                        cursor: 'pointer',
                        
                }}>
                    <h2 style = {{marginBottom: '5px', color:'#f0e8e8',}}>🏋️ {workouts.name}</h2>
                    <p style = {{marginBottom: '5px', color:'#a08080', marginLeft: '35px', marginTop:'4px'}}>{workouts.date}</p>
                    <h4 style = {{color:'#f0e8e8', marginTop: '10px'}}>Number of Excercices: {workouts.exercises.length}</h4>
                </div>
            )}
        </div>
    )
}

export default Workouts