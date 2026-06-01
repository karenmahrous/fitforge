import { useState } from "react"

function WorkoutDetail({ workout, onBack, onDelete, workouts, setWorkouts}: {
    workout: any, 
    onBack: () => void, 
    onDelete: () => void, 
    workouts: any[], 
    setWorkouts: (w: any[]) => void 
}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedWorkout, setEditedWorkout] = useState(workout.exercises)

    return (
        <div style={{ paddingBottom: '100px'}}>

            {/* Top bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 16px',
                marginBottom: '50px'
            }}>
                <div
                    onClick={onBack}
                    style={{
                        background: '#3f2e2e',
                        color: '#f0e8e8',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    <span style={{ fontSize: '15px' }}>← Back</span>
                </div>
                <div
                    onClick={() => {
                        if (isEditing) {
                            const updatedWorkout = workouts.map(w => 
                                w.id === workout.id ? {
                                    ...w,
                                    exercises: editedWorkout
                                } : w
                            )
                            setWorkouts(updatedWorkout)
                        }
                        setIsEditing(!isEditing)
                    }}
                    style={{
                        background: isEditing ? '#E8603C' : '#3f2e2e',
                        color: '#f0e8e8',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    <span style={{ fontSize: '15px' }}>{isEditing ? 'Save' : 'Edit'}</span>
                </div>
            </div>

            {/* Workout name card */}
            <div style={{ padding: '0 16px 16px' }}>
                <div style={{
                    background: '#3f2e2e',
                    borderRadius: '20px',
                    padding: '24px',
                    textAlign: 'center',
                }}>
                    <h2 style={{ color: '#f0e8e8', fontSize: '24px', marginBottom: '10px' }}>
                        🏋️ {workout.name}
                    </h2>
                    <p style={{ color: '#a08080', fontSize: '14px', paddingBottom: '10px' }}>{workout.date}</p>
                </div>
            </div>

            {/* Exercises card */}
            <div style={{ padding: '0 16px 16px', marginTop: '18px' }}>
                <div style={{
                    background: '#3f2e2e',
                    borderRadius: '20px',
                    padding: '20px',
                }}>
                    <p style={{
                        color: '#a08080',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '16px',
                    }}>
                        Exercises
                    </p>

                    {editedWorkout.map((exercise: any, index: number) => (
                        <div key={index} style={{
                            padding: '14px',
                            background: '#2d0a1a',
                            borderRadius: '12px',
                            marginBottom: '10px',
                        }}>
                            {isEditing ? (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        value={exercise.name}
                                        onChange={(e) => {
                                            const updated = [...editedWorkout]
                                            updated[index].name = e.target.value
                                            setEditedWorkout(updated)
                                        }}
                                        style={{
                                            flex: 2, padding: '8px', borderRadius: '8px',
                                            border: 'none', background: '#5a3030',
                                            color: '#f0e8e8', fontSize: '13px',
                                        }}
                                    />
                                    <input
                                        value={exercise.sets}
                                        onChange={(e) => {
                                            const updated = [...editedWorkout]
                                            updated[index].sets = e.target.value
                                            setEditedWorkout(updated)
                                        }}
                                        placeholder="Sets"
                                        style={{
                                            flex: 1, padding: '8px', borderRadius: '8px',
                                            border: 'none', background: '#5a3030',
                                            color: '#f0e8e8', fontSize: '13px',
                                        }}
                                    />
                                    <input
                                        value={exercise.reps}
                                        onChange={(e) => {
                                            const updated = [...editedWorkout]
                                            updated[index].reps = e.target.value
                                            setEditedWorkout(updated)
                                        }}
                                        placeholder="Reps"
                                        style={{
                                            flex: 1, padding: '8px', borderRadius: '8px',
                                            border: 'none', background: '#5a3030',
                                            color: '#f0e8e8', fontSize: '13px',
                                        }}
                                    />
                                    <p
                                        onClick={() => setEditedWorkout(editedWorkout.filter((_: any, i: number) => i !== index))}
                                        style={{
                                            color: '#E8603C', cursor: 'pointer',
                                            marginTop: '8px', fontSize: '13px'
                                        }}
                                    >
                                        ✕
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h3 style={{ color: '#f0e8e8', fontSize: '16px', marginBottom: '6px' }}>
                                        {exercise.name}
                                    </h3>
                                    <p style={{ color: '#a08080', fontSize: '13px' }}>
                                        {exercise.sets} sets · {exercise.reps} reps
                                    </p>
                                </>
                            )}
                        </div>
                    ))}

                    {/* Add exercise button - only in edit mode */}
                    {isEditing && (
                        <div
                            onClick={() => setEditedWorkout([...editedWorkout, { name: '', sets: '', reps: '' }])}
                            style={{
                                color: '#E8603C',
                                fontSize: '13px',
                                cursor: 'pointer',
                                marginTop: '8px',
                            }}
                        >
                            + Add Exercise
                        </div>
                    )}
                </div>
            </div>

            {/* Delete button */}
            <div style={{ padding: '0 16px' }}>
                <div
                    onClick={onDelete}
                    style={{
                        background: '#3f2e2e',
                        color: '#E8603C',
                        padding: '16px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        fontSize: '14px',
                        border: '0.5px solid #E8603C44',
                    }}
                >
                    <h4>Delete Workout</h4>
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetail