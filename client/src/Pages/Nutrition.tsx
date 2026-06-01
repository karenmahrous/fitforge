import { useState } from "react"

function Nutrition({meal, setMeal} : {meal : any, setMeal: (M:any) => void}) {
    const [showForm, setShowForm] = useState<string | null>(null)
    const [newMeal, setNewMeal] = useState({name: '', calories: '', protein: '', carbs: '', fat: ''})
    
    return (
        <div style={{ paddingBottom: '100px' }}>
            <h2 style={{ color: '#f0e8e8', padding: '20px', fontSize: '22px', marginBottom: '15px'}}>
                Nutrition
            </h2>
            <div style={{ padding: '0 16px' }}>

                {/* Calories summary card */}
                <div style={{
                    background: 'linear-gradient(135deg, #8b4558, #5a2535)',
                    padding: '20px',
                    borderRadius: '20px',
                }}>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>Calories today</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0' }}>
                        <h2 style={{ color: '#fff', fontSize: '28px' }}>
                            1,240 <span style={{ fontSize: '16px', fontWeight: '400' }}>/ 1,800 kcal</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>560 remaining</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '50px', height: '8px', marginBottom: '20px' }}>
                        <div style={{ backgroundColor: '#fff', width: '62%', height: '8px', borderRadius: '50px' }} />
                    </div>
                    {[
                        { label: 'Protein', current: 42, goal: 150, color: '#ff8a65' },
                        { label: 'Carbs', current: 85, goal: 200, color: '#81d4fa' },
                        { label: 'Fats', current: 20, goal: 60, color: '#a5d6a7' },
                    ].map(macro => (
                        <div key={macro.label} style={{ marginBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{macro.label}</p>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                                    {macro.current}g / {macro.goal}g
                                </p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '50px', height: '7px' }}>
                                <div style={{
                                    backgroundColor: macro.color,
                                    width: `${(macro.current / macro.goal) * 100}%`,
                                    height: '7px',
                                    borderRadius: '50px',
                                }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Meal sections */}
                {[
                    { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
                    { key: 'lunch', label: 'Lunch', icon: '☀️' },
                    { key: 'dinner', label: 'Dinner', icon: '🌙' },
                    { key: 'snacks', label: 'Snacks', icon: '🍎' },
                ].map(mealType => (
                    <div key={mealType.key} style={{
                        background: 'linear-gradient(135deg, #8b4558, #5a2535)',
                        padding: '20px',
                        borderRadius: '20px',
                        marginTop: '25px'
                    }}>
                        {/* Meal header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <h3>{mealType.label + ' ' + mealType.icon}</h3>
                            <h3
                                onClick={() => setShowForm(showForm === mealType.key ? null : mealType.key)}
                                style={{ cursor: 'pointer', color: '#ff7651', fontSize: '22px' }}
                            >
                                {showForm === mealType.key ? '✕' : '+'}
                            </h3>
                        </div>

                        {/* Total calories */}
                        {meal[mealType.key].length > 0 && (
                            <p style={{ color: '#e8c6c6', fontSize: '13px', marginBottom: '12px' }}>
                                {meal[mealType.key].reduce((sum: number, item: any) => sum + Number(item.calories), 0)} kcal
                            </p>
                        )}

                        {/* Food items */}
                        {meal[mealType.key].length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                                {meal[mealType.key].map((item: any) => (
                                    <div style = {{
                                        display: 'flex'
                                    }}>
                                        <div key={item.id} style={{
                                            background: '#eec0cd',
                                            padding: '12px 16px',
                                            borderRadius: '14px',
                                            color: '#451f29',
                                            flex: 2
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                <h4 style={{ fontSize: '16px' }}>{item.name}</h4>
                                                <p style={{ fontSize: '14px' }}>{item.calories} kcal</p>
                                            </div>
                                            <div style={{ display: 'flex', gap: '12px' }}>
                                                <p style={{ fontSize: '13px' }}>P: {item.protein}g</p>
                                                <p style={{ fontSize: '13px' }}>C: {item.carbs}g</p>
                                                <p style={{ fontSize: '13px' }}>F: {item.fat}g</p>
                                            </div>
                                        </div>
                                        <div onClick={() => setMeal({
                                            ...meal,
                                            [mealType.key] : meal[mealType.key].filter((i: any) => i.id !== item.id)
                                        })}
                                        style = {{
                                           marginLeft : '20px',
                                           marginTop: '20px',
                                           cursor: 'pointer'
                                        }}>
                                            <h3 style = {{color: '#ff7651'}}>x</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add meal form */}
                        {showForm === mealType.key && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                                <input
                                    placeholder="Food name"
                                    value={newMeal.name}
                                    onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                                    style={{ padding: '10px', borderRadius: '10px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input placeholder="Calories" value={newMeal.calories}
                                        onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                    />
                                    <input placeholder="Protein" value={newMeal.protein}
                                        onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                    />
                                    <input placeholder="Carbs" value={newMeal.carbs}
                                        onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                    />
                                    <input placeholder="Fat" value={newMeal.fat}
                                        onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <div onClick={() => setShowForm(null)} style={{
                                        flex: 1, padding: '10px', borderRadius: '10px',
                                        background: '#5a2535', color: '#f0e8e8',
                                        textAlign: 'center', cursor: 'pointer'
                                    }}>
                                        Cancel
                                    </div>
                                    <div onClick={() => {
                                        if (newMeal.name.trim() === '') return
                                        setMeal({
                                            ...meal,
                                            [mealType.key]: [...meal[mealType.key], { id: Date.now(), ...newMeal }]
                                        })
                                        setNewMeal({ name: '', calories: '', protein: '', carbs: '', fat: '' })
                                        setShowForm(null)
                                    }} style={{
                                        flex: 1, padding: '10px', borderRadius: '10px',
                                        background: '#E8603C', color: '#fff',
                                        textAlign: 'center', cursor: 'pointer'
                                    }}>
                                        Save
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Nutrition