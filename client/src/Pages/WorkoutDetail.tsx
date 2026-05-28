

function WorkoutDetail({workout, onBack} : {workout : any, onBack : () => void}){
    return(
        <>
            <div style = {{
                padding: '15px',
                display: 'flex',
            }}>
                <div onClick={onBack}
                style = {{
                    borderRadius: '60px',
                    background: '#3f2e2e',
                    color: '#f0e8e8',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex', 
                    marginBottom: '20px'
                }}>
                    ← Back 
                </div>
            </div>
            <div style = {{padding: '18px'}}>
                <div style = {{
                    padding: '22px',
                    background: '#3f2e2e',
                    borderRadius: '30px',
                    
                }}>
                    <h2 style = {{padding: '2px', color: '#f0e8e8', textAlign: "center", fontSize: '22px'}}>🏋️ {workout.name}</h2>
                    <p style = {{padding: '2px', color: '#f0e8e8', textAlign: "center", fontSize: '15px', marginTop: '15px'}}>{workout.date}</p>
                </div>
            </div>
            <div style = {{padding: '18px'}}>
                <div style = {{
                    padding: '22px',
                    background: '#3f2e2e',
                    borderRadius: '30px',
                    
                }}>
                    <h2 style = {{padding: '2px', color: '#f0e8e8', textAlign: "center", fontSize: '22px'}}>Exercises</h2>
                    
                    <ul style = {{padding: '10px'}}>
                        {workout.exercises.map((exercise: any) =>
                            <li key = {workout.id} style = {{padding: '18px'}}>
                                <h3 style = {{marginBottom: '10px', fontSize: '20px',}}>{exercise.name}</h3>
                                <p style={{color: '#a08080', fontSize: '16px'}}>{exercise.sets} sets · {exercise.reps} reps</p>
                            </li>
                        )}
                    </ul>
                    
                </div>
            </div>
        </>
    )
  }

export default WorkoutDetail