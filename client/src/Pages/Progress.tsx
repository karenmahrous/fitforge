function Progress({ workouts }: { workouts: any[] }) {

    const totalWorkouts = workouts.length
    const totalExercises = workouts.reduce((sum, w) => sum + w.exercises.length, 0)
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const weekData = days.map(day => ({ day, workouts: Math.floor(Math.random() * 3) }))

    const recentWorkouts = [...workouts].reverse().slice(0, 3)

    return (
        <div style={{ paddingBottom: '100px' }}>

            {/* Header */}
            <h2 style={{ color: '#f0e8e8', padding: '20px', fontSize: '22px', marginBottom: '15px'}}>
                Progress
            </h2>

            <div style={{ padding: '0 16px' }}>

                {/* Stat cards */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    <div style={{
                        flex: 1, background: '#3f2e2e', borderRadius: '16px',
                        padding: '16px', textAlign: 'center'
                    }}>
                        <h2 style={{ color: '#E8603C', fontSize: '28px' }}>{totalWorkouts}</h2>
                        <p style={{ color: '#a08080', fontSize: '12px', marginTop: '4px' }}>Workouts</p>
                    </div>
                    <div style={{
                        flex: 1, background: '#3f2e2e', borderRadius: '16px',
                        padding: '16px', textAlign: 'center'
                    }}>
                        <h2 style={{ color: '#E8603C', fontSize: '28px' }}>{totalExercises}</h2>
                        <p style={{ color: '#a08080', fontSize: '12px', marginTop: '4px' }}>Exercises</p>
                    </div>
                    <div style={{
                        flex: 1, background: '#3f2e2e', borderRadius: '16px',
                        padding: '16px', textAlign: 'center'
                    }}>
                        <h2 style={{ color: '#E8603C', fontSize: '28px' }}>🔥 3</h2>
                        <p style={{ color: '#a08080', fontSize: '12px', marginTop: '4px' }}>Day Streak</p>
                    </div>
                </div>

                {/* Calorie summary */}
                <div style={{
                    background: '#6a2d40',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>Avg daily calories</p>
                        <h2 style={{ color: '#fff', fontSize: '28px', marginTop: '4px' }}>1,540</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '4px', marginLeft: '10px'}}>this week</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', marginRight: '12px'}}>Goal</p>
                        <h2 style={{ color: '#fff', fontSize: '28px', marginTop: '4px' }}>1,800</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '4px' }}>kcal / day</p>
                    </div>
                </div>

                {/* Weekly chart */}
                <div style={{
                    background: '#3f2e2e', borderRadius: '20px',
                    padding: '20px', marginBottom: '20px'
                }}>
                    <p style={{
                        color: '#a08080', fontSize: '11px',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        marginBottom: '16px'
                    }}>
                        This week
                    </p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
                        {weekData.map((item) => (
                            <div key={item.day} style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '6px',
                                height: '100%',
                                justifyContent: 'flex-end',
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: item.workouts === 0 ? '4px' : `${(item.workouts / 4) * 100}%`,
                                    background: item.workouts > 0 ? '#E8603C' : '#3a2020',
                                    borderRadius: '6px 6px 0 0',
                                }} />
                                <p style={{ color: '#a08080', fontSize: '11px' }}>{item.day}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent workouts */}
                <div style={{
                    background: '#3f2e2e', borderRadius: '20px', padding: '20px'
                }}>
                    <p style={{
                        color: '#a08080', fontSize: '11px',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        marginBottom: '16px'
                    }}>
                        Recent workouts
                    </p>
                    {recentWorkouts.map((workout, index) => (
                        <div key={index} style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', padding: '12px',
                            background: '#2d0a1a', borderRadius: '12px',
                            marginBottom: '8px'
                        }}>
                            <div>
                                <p style={{ color: '#f0e8e8', fontSize: '14px', fontWeight: '500' }}>
                                    🏋️ {workout.name}
                                </p>
                                <p style={{ color: '#a08080', fontSize: '12px', marginTop: '3px' }}>
                                    {workout.date} · {workout.exercises.length} exercises
                                </p>
                            </div>
                        </div>
                    ))}
                    {recentWorkouts.length === 0 && (
                        <p style={{ color: '#a08080', fontSize: '13px', textAlign: 'center' }}>
                            No workouts logged yet
                        </p>
                    )}
                </div>

                {/* Personal bests */}
                <div style={{
                    background: '#3f2e2e',
                    borderRadius: '20px',
                    padding: '20px',
                    marginTop: '20px',
                }}>
                    <p style={{
                        color: '#a08080', fontSize: '11px',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        marginBottom: '16px'
                    }}>
                        Personal bests
                    </p>
                    {[
                        { exercise: 'Bench Press', value: '4 sets x 10 reps' },
                        { exercise: 'Shoulder Press', value: '3 sets x 12 reps' },
                        { exercise: 'Pull Ups', value: '4 sets x 8 reps' },
                    ].map((pb, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            background: '#2d0a1a',
                            borderRadius: '12px',
                            marginBottom: '8px',
                        }}>
                            <p style={{ color: '#f0e8e8', fontSize: '14px' }}>🏆 {pb.exercise}</p>
                            <p style={{ color: '#a08080', fontSize: '13px' }}>{pb.value}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Progress