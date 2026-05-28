function Dashboard(){
    return(
        <>
            <div style = {{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px'
            }}>
                <div>
                    <p style={{ color: '#b79f9f', fontSize: '18px'}}>Good morning 👋</p>
                    <h2 style={{ color: '#dabcbc', fontSize: '22px', fontWeight: '500', marginTop: '4px'}}>Karen !</h2>
                </div>

                <div style ={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '100%',
                    backgroundColor: '#E8603C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '500',
                    fontSize: '16px',}}>
                    K
                </div>
        </div>
        <div style = {{padding: '13px'}}>
            <div style = {{
                background: 'linear-gradient(135deg, #dcb6ab, #815246)', 
                padding: '20px',
                color: '#3f1e1e', 
                borderRadius: '13px',
            }}>
                <p>Calories today</p>
                <h2>1,240 <span style =  {{fontSize: '19px'}}>/ 1,800 kcal </span></h2>
                <p>560 kcal remaining</p>

                <div style = {{
                    background: '#e1801f',
                    borderRadius: '20px',
                    marginTop: '14px',
                    height: '9px',
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        height: '9px',
                        width: '62%',
                    }} />
                </div>
            </div>
        </div>
        <div style = {{
            padding: '13px'
        }}>
            <div style = {{
                background:'linear-gradient(135deg, #dcb6ab, #9c7970)',
                padding: '20px',
                borderRadius: '13px',
            }}>
                <h2 style = {{color: '#3f1e1e', textAlign: "center", marginBottom: '12px'}}>Today's stats</h2>
                <div style = {{display: 'flex', gap:'12px'}}>
                    <DailyItem icon = '🏋️' label ='Exercises' number = '3' />
                    <DailyItem icon = '🔥' label ='Burned' number = '420' />
                    <DailyItem icon = '💧' label ='Glasses' number = '6' />
                </div>
            </div>
        </div>
        <div style={{ padding: '13px' }}>
            <div style={{
                background: '#483535',
                padding: '16px',
                borderRadius: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
            }}>
                {/* Icon box */}
                <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#623434',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '23px',
                }}>
                    🏃
                </div>

                {/* Workout info */}
                <div style={{ flex: 1 }}>
                    <p style={{ color: '#f0e8e8', fontWeight: '500', fontSize: '15px' }}>Push Day</p>
                    <p style={{ color: '#b49292', fontSize: '12px', marginTop: '3px' }}>4 exercises · 45 min</p>
                </div>

                {/* Badge */}
                <div style={{
                    backgroundColor: '#633535',
                    color: '#E8603C',
                    fontSize: '13px',
                    padding: '4px 10px',
                    borderRadius: '99px',
                }}>
                    In progress
                </div>
            </div>
        </div>

    </>
    )
}

function DailyItem({icon, label, number}: {icon: string, label: string, number: string}){
    return(
            <div style={{
                flex: 1,
                background: '#3f2e2e',
                borderRadius: '13px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                
            }}>
                <span style={{ fontSize: '22px' }}>{icon}</span>
                <span style={{ fontSize: '16px', color: '#f0e8e8', fontWeight: '500' }}>{number}</span>
                <span style={{ fontSize: '12px', color: '#cebcbc' }}>{label}</span>
            </div>
    )
}

export default Dashboard