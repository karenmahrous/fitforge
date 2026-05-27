function Navbar(){
    return(
        <nav style = {{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            backgroundColor: '#3f212e',
            borderTop: '0.5px solid #000000',
            display: 'flex',
            padding: '10px 0 20px'
        }}>
        <NavItem icon="🏠" label="Home" active />
        <NavItem icon="🏋️" label="Workouts" />
        <NavItem icon="🥗" label="Nutrition" />
        <NavItem icon="📈" label="Progress" />
        <NavItem icon="🤖" label="Coach" />
        </nav>
    )
}

function NavItem({icon, label, active} : {icon: string, label: string, active?: boolean}){
    return(
        <div style = {{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
        }}>
             <span style={{ fontSize: '20px' }}>{icon}</span>
             <span style={{
                fontSize: '10px',
                color: active ? '#E8603C' : '#a08080',
            }}>
                {label}
            </span>    
            {active && (
            <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '100%',
                backgroundColor: '#E8603C',
                }} />
            )} 
        </div>
    )
}

export default Navbar