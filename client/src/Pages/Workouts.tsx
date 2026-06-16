import { useState } from "react";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function Workouts({ onSelectWorkout, workouts, setWorkouts }: {
    onSelectWorkout: (workout: any) => void,
    workouts: any[],
    setWorkouts: (w: any[]) => void
}) {
    const [workoutName, setWorkoutName] = useState('')
    const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '' }])
    const [showForm, setShowForm] = useState(false)
    const [selectedDay, setSelectedDay] = useState('Monday')

    function handleSave() {
        if (workoutName.trim() === '') return

        const filteredExercises = exercises.filter(e => e.name.trim() !== '')

        if (filteredExercises.length === 0) return

        const newWorkout = {
            id: Date.now(),
            name: workoutName,
            day: selectedDay,
            date: new Date().toISOString().split('T')[0],
            exercises: filteredExercises.map(s => ({
                name: s.name,
                sets: s.sets,
                reps: s.reps
            }))
        }

        setWorkouts([...workouts, newWorkout])
        setWorkoutName('')
        setExercises([{ name: '', sets: '', reps: '' }])
        setSelectedDay('Monday')
        setShowForm(false)
    }

    return (
        <div style={{ paddingBottom: '100px' }}>

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
                            marginBottom: '16px',
                            boxSizing: 'border-box' as const
                        }}
                    />

                    {/* Day selector */}
                    <p style={{ color: '#c49e9e', fontSize: '13px', marginBottom: '8px' }}>Assign to Day</p>
                    <div style={{
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap',
                        marginBottom: '16px'
                    }}>
                        {DAYS.map(day => (
                            <div
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    background: selectedDay === day ? '#E8603C' : '#5a3030',
                                    color: selectedDay === day ? '#fff' : '#c49e9e',
                                }}
                            >
                                {day.slice(0, 3)}
                            </div>
                        ))}
                    </div>

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
                                    flex: 2, padding: '10px', borderRadius: '8px',
                                    border: 'none', background: '#5a3030',
                                    color: '#f0e8e8', fontSize: '13px',
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
                                    flex: 1, padding: '10px', borderRadius: '8px',
                                    border: 'none', background: '#5a3030',
                                    color: '#f0e8e8', fontSize: '13px',
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
                                    flex: 1, padding: '10px', borderRadius: '8px',
                                    border: 'none', background: '#5a3030',
                                    color: '#f0e8e8', fontSize: '13px',
                                }}
                            />
                            <p
                                onClick={() => setExercises(exercises.filter((_, i) => i !== index))}
                                style={{
                                    color: '#E8603C', fontSize: '13px',
                                    cursor: 'pointer', marginTop: '12px',
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
                            color: '#E8603C', fontSize: '13px',
                            cursor: 'pointer', marginTop: '8px', marginBottom: '16px',
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
                                setSelectedDay('Monday')
                            }}
                            style={{
                                flex: 1, padding: '12px', borderRadius: '8px',
                                background: '#5a3030', color: '#f0e8e8',
                                textAlign: 'center', cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </div>
                        <div
                            onClick={handleSave}
                            style={{
                                flex: 1, padding: '12px', borderRadius: '8px',
                                background: '#E8603C', color: '#fff',
                                textAlign: 'center', cursor: 'pointer',
                            }}
                        >
                            Save
                        </div>
                    </div>
                </div>
            }

            {/* Workout list grouped by day */}
            <div style={{ padding: '20px', marginTop: '10px' }}>
                {DAYS.map(day => {
                    const dayWorkouts = workouts.filter(w => w.day === day)
                    if (dayWorkouts.length === 0) return null

                    return (
                        <div key={day} style={{ marginBottom: '24px' }}>

                            {/* Day header */}
                            <p style={{
                                color: '#E8603C',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                marginBottom: '10px'
                            }}>
                                {day}
                            </p>

                            {/* Workouts for this day */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {dayWorkouts.map(workout => (
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
                                        <h4 style={{ color: '#f0e8e8', marginTop: '10px' }}>
                                            Number of Exercises: {workout.exercises.length}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}

                {/* Empty state */}
                {workouts.length === 0 && (
                    <p style={{ color: '#a08080', fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>
                        No workouts yet. Tap "+ Log Workout" to get started.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Workouts