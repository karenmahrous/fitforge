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
                    <h2 style={{ color: '#dabcbc', fontSize: '22px', fontWeight: '500', marginTop: '4px'}}>Karen</h2>
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
    </>
    )
}

export default Dashboard