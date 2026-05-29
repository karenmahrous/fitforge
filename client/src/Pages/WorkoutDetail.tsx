import { useState } from "react"

function WorkoutDetail({ workout, onBack, onDelete }: { workout: any, onBack: () => void, onDelete: () => void }) {
    const [isEditing, setIsEditing] = useState(false)

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
                    <span style = {{fontSize: '15px'}}>← Back</span>
                </div>
                <div
                    onClick={() => setIsEditing(!isEditing)}
                    style={{
                        background: isEditing ? '#E8603C' : '#3f2e2e',
                        color: '#f0e8e8',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    <span style = {{fontSize: '15px'}}>{isEditing ? 'Save' : 'Edit'}</span>
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

                    {workout.exercises.map((exercise: any, index: number) => (
                        <div key={index} style={{
                            padding: '14px',
                            background: '#2d0a1a',
                            borderRadius: '12px',
                            marginBottom: '10px',
                        }}>
                            <h3 style={{ color: '#f0e8e8', fontSize: '16px', marginBottom: '6px' }}>
                                {exercise.name}
                            </h3>
                            <p style={{ color: '#a08080', fontSize: '13px' }}>
                                {exercise.sets} sets · {exercise.reps} reps
                            </p>
                        </div>
                    ))}
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