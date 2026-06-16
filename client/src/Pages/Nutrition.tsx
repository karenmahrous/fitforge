import { useState } from "react"

function Nutrition({meal, setMeal} : {meal : any, setMeal: (M:any) => void}) {
    const [showForm, setShowForm] = useState<string | null>(null)
    const [showAddMenu, setShowAddMenu] = useState<string | null>(null)
    const [newMeal, setNewMeal] = useState({name: '', calories: '', protein: '', carbs: '', fat: ''})
    const [editingMeal, setEditingMeal] = useState<number | null>(null)
    const [editedMealItem, setEditedMealItem] = useState({name: '', calories: '', protein: '', carbs: '', fat: ''})

    function handleSearch(mealKey: string) {
        setShowAddMenu(null)
        setShowForm(mealKey)  // for now opens the manual form — replace with search later
    }

    function handleScan(mealKey: string) {
        setShowAddMenu(null)
        alert('Barcode scanning coming soon!')  // stub — replace with backend logic later
    }
    
    return (
        <div style={{ paddingBottom: '100px' }}>
            <h2 style={{ color: '#f0e8e8', padding: '20px', fontSize: '22px', marginBottom: '15px'}}>
                Nutrition
            </h2>
            <div style={{ padding: '0 16px' }}>

                {/* Calories summary card */}
                <div style={{
                    background: 'linear-gradient(135deg, #3f2e2e, #5a2535)',
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
                        background: 'linear-gradient(135deg, #3f2e2e, #5a2535)',
                        padding: '20px',
                        borderRadius: '20px',
                        marginTop: '25px',
                        position: 'relative'
                    }}>
                        {/* Meal header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <h3>{mealType.label + ' ' + mealType.icon}</h3>

                            {/* + button */}
                            {showForm !== mealType.key && (
                                <h3
                                    onClick={() => setShowAddMenu(showAddMenu === mealType.key ? null : mealType.key)}
                                    style={{ cursor: 'pointer', color: '#ff7651', fontSize: '22px' }}
                                >
                                    +
                                </h3>
                            )}
                        </div>

                        {/* Dropdown menu */}
                        {showAddMenu === mealType.key && (
                            <div style={{
                                position: 'absolute',
                                top: '48px',
                                right: '20px',
                                background: '#5a2535',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                zIndex: 10,
                                boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
                            }}>
                                <div
                                    onClick={() => handleSearch(mealType.key)}
                                    style={{
                                        padding: '12px 24px',
                                        color: '#f0e8e8',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    🔍 Search
                                </div>
                                <div
                                    onClick={() => handleScan(mealType.key)}
                                    style={{
                                        padding: '12px 24px',
                                        color: '#f0e8e8',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    𝄃𝄀𝄁𝄃 Scan Barcode
                                </div>
                            </div>
                        )}

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
                                    <div key={item.id} style={{ display: 'flex' }}>
                                        <div style={{
                                            background: '#703747',
                                            padding: '12px 16px',
                                            borderRadius: '14px',
                                            color: '#f3dee3',
                                            flex: 2
                                        }}>
                                            {editingMeal === item.id ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    <input
                                                        value={editedMealItem.name}
                                                        onChange={(e) => setEditedMealItem({ ...editedMealItem, name: e.target.value })}
                                                        placeholder="Food name"
                                                        style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                                    />
                                                    <div style={{ display: 'flex', gap: '6px' }}>
                                                        <input
                                                            value={editedMealItem.calories}
                                                            onChange={(e) => setEditedMealItem({ ...editedMealItem, calories: e.target.value })}
                                                            placeholder="Calories"
                                                            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                                        />
                                                        <input
                                                            value={editedMealItem.protein}
                                                            onChange={(e) => setEditedMealItem({ ...editedMealItem, protein: e.target.value })}
                                                            placeholder="Protein"
                                                            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                                        />
                                                        <input
                                                            value={editedMealItem.carbs}
                                                            onChange={(e) => setEditedMealItem({ ...editedMealItem, carbs: e.target.value })}
                                                            placeholder="Carbs"
                                                            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                                        />
                                                        <input
                                                            value={editedMealItem.fat}
                                                            onChange={(e) => setEditedMealItem({ ...editedMealItem, fat: e.target.value })}
                                                            placeholder="Fat"
                                                            style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: '#5a2535', color: '#f0e8e8' }}
                                                        />
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <div
                                                            onClick={() => setEditingMeal(null)}
                                                            style={{
                                                                flex: 1, padding: '8px', borderRadius: '8px',
                                                                background: '#5a2535', color: '#f0e8e8',
                                                                textAlign: 'center', cursor: 'pointer', fontSize: '13px'
                                                            }}
                                                        >
                                                            Cancel
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                setMeal({
                                                                    ...meal,
                                                                    [mealType.key]: meal[mealType.key].map((i: any) =>
                                                                        i.id === item.id ? { ...i, ...editedMealItem } : i
                                                                    )
                                                                })
                                                                setEditingMeal(null)
                                                            }}
                                                            style={{
                                                                flex: 1, padding: '8px', borderRadius: '8px',
                                                                background: '#E8603C', color: '#fff',
                                                                textAlign: 'center', cursor: 'pointer', fontSize: '13px'
                                                            }}
                                                        >
                                                            Save
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        setEditingMeal(item.id)
                                                        setEditedMealItem({
                                                            name: item.name,
                                                            calories: item.calories,
                                                            protein: item.protein,
                                                            carbs: item.carbs,
                                                            fat: item.fat
                                                        })
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >
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
                                            )}
                                        </div>

                                        {editingMeal !== item.id && (
                                            <div
                                                onClick={() => setMeal({
                                                    ...meal,
                                                    [mealType.key]: meal[mealType.key].filter((i: any) => i.id !== item.id)
                                                })}
                                                style={{ marginLeft: '12px', marginTop: '12px', cursor: 'pointer' }}
                                            >
                                                <h3 style={{ color: '#ff7651' }}>✕</h3>
                                            </div>
                                        )}
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
                                    style={{ padding: '10px', borderRadius: '10px', border: 'none', background: '#672b3d', color: '#f0e8e8' }}
                                />
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input placeholder="Calories" value={newMeal.calories}
                                        onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#672b3d', color: '#f0e8e8' }}
                                    />
                                    <input placeholder="Protein" value={newMeal.protein}
                                        onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#672b3d', color: '#f0e8e8' }}
                                    />
                                    <input placeholder="Carbs" value={newMeal.carbs}
                                        onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#672b3d', color: '#f0e8e8' }}
                                    />
                                    <input placeholder="Fat" value={newMeal.fat}
                                        onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#672b3d', color: '#f0e8e8' }}
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