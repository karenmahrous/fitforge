import { useState } from "react";

function Workouts({ onSelectWorkout, workouts, setWorkouts }: {
    onSelectWorkout: (workout: any) => void,
    workouts: any[],
    setWorkouts: (w: any[]) => void
}) {
    const [workoutName, setWorkoutName] = useState('')
    const [exercises, setExercises] = useState([
        { name: '', sets: '', reps: '' }
    ])
    const [showForm, setShowForm] = useState(false)

    function handleSave() {
        if (workoutName.trim() === '') return

        const newWorkout = {
            id: Date.now(),
            name: workoutName,
            date: new Date().toISOString().split('T')[0],
            exercises: exercises.map(s => ({
                name: s.name,
                sets: s.sets,
                reps: s.reps
            }))
        }

        setWorkouts([...workouts, newWorkout])
        setWorkoutName('')
        setExercises([{ name: '', sets: '', reps: '' }])
        setShowForm(false)
    }

    return (
        <>
            {/* Log Workout Button */}
            {!showForm &&
                <div style={{ padding: '20px', display: 'flex' }}>
                    <div
                        onClick={() => setShowForm(true)}
                        style={{
                            background: '#ad7d7d',
                            color: '#f0e8e8',
                            padding: '13px',
                            borderRadius: '13px',
                            cursor: 'pointer'
                        }}
                    >
                        <h4>+ Log Workout</h4>
                    </div>
                </div>
            }

            {/* New Workout Form */}
            {showForm &&
                <div style={{
                    background: '#3f2e2e',
                    borderRadius: '13px',
                    padding: '20px',
                    margin: '30px 20px 0',
                }}>
                    <h3 style={{ color: '#f0e8e8', marginBottom: '16px' }}>New Workout</h3>

                    {/* Workout name */}
                    <input
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        placeholder="Workout Name"
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#5a3030',
                            color: '#f0e8e8',
                            fontSize: '14px',
                            marginBottom: '12px',
                        }}
                    />

                    {/* Exercise rows */}
                    <p style={{ color: '#c49e9e', fontSize: '13px', marginBottom: '8px' }}>Exercises</p>
                    {exercises.map((exercise, index) => (
                        <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input
                                placeholder="Exercise name"
                                value={exercise.name}
                                onChange={(e) => {
                                    const updated = [...exercises]
                                    updated[index].name = e.target.value
                                    setExercises(updated)
                                }}
                                style={{
                                    flex: 2,
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: '#5a3030',
                                    color: '#f0e8e8',
                                    fontSize: '13px',
                                }}
                            />
                            <input
                                placeholder="Sets"
                                value={exercise.sets}
                                onChange={(e) => {
                                    const updated = [...exercises]
                                    updated[index].sets = e.target.value
                                    setExercises(updated)
                                }}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: '#5a3030',
                                    color: '#f0e8e8',
                                    fontSize: '13px',
                                }}
                            />
                            <input
                                placeholder="Reps"
                                value={exercise.reps}
                                onChange={(e) => {
                                    const updated = [...exercises]
                                    updated[index].reps = e.target.value
                                    setExercises(updated)
                                }}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: '#5a3030',
                                    color: '#f0e8e8',
                                    fontSize: '13px',
                                }}
                            />
                            <p
                                onClick={() => setExercises(exercises.filter((_, i) => i !== index))}
                                style={{
                                    color: '#E8603C',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    marginTop: '12px',
                                }}
                            >
                                ✕
                            </p>
                        </div>
                    ))}

                    {/* Add exercise */}
                    <div
                        onClick={() => setExercises([...exercises, { name: '', sets: '', reps: '' }])}
                        style={{
                            color: '#E8603C',
                            fontSize: '13px',
                            cursor: 'pointer',
                            marginTop: '8px',
                            marginBottom: '16px',
                        }}
                    >
                        + Add Exercise
                    </div>

                    {/* Cancel and Save */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div
                            onClick={() => {
                                setShowForm(false)
                                setWorkoutName('')
                                setExercises([{ name: '', sets: '', reps: '' }])
                            }}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '8px',
                                background: '#5a3030',
                                color: '#f0e8e8',
                                textAlign: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </div>
                        <div
                            onClick={handleSave}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '8px',
                                background: '#E8603C',
                                color: '#fff',
                                textAlign: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            Save
                        </div>
                    </div>
                </div>
            }

            {/* Workout list */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                gap: '12px',
                marginTop: '10px'
            }}>
                {workouts.map(workout =>
                    <div
                        key={workout.id}
                        onClick={() => onSelectWorkout(workout)}
                        style={{
                            background: '#3f2e2e',
                            borderRadius: '13px',
                            padding: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        <h2 style={{ marginBottom: '5px', color: '#f0e8e8' }}>🏋️ {workout.name}</h2>
                        <p style={{ color: '#a08080', marginLeft: '35px', marginTop: '4px' }}>{workout.date}</p>
                        <h4 style={{ color: '#f0e8e8', marginTop: '10px' }}>Number of Exercises: {workout.exercises.length}</h4>
                    </div>
                )}
            </div>
        </>
    )
}

export default Workouts