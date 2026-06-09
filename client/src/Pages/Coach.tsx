import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import Groq from "groq-sdk"

function Coach(){

    const [messages, setMessages] = useState([{
        role: 'assistant', content: 'Hey! I am your AI fitness coach. Ask me anything about workouts, nutrition, or recovery!'
    }])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSend(){
        if(input.trim() === '' || isLoading) return

        const userMessage = { role: 'user', content: input }
        const updatedMessage = [...messages, userMessage]
        setMessages(updatedMessage)
        setInput('')
        setIsLoading(true)

        try{
            const groq = new Groq({
                apiKey: import.meta.env.VITE_GROQ_API_KEY,
                dangerouslyAllowBrowser: true
            })

            const response = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `You are a personal fitness coach. Give helpful, concise advice about workouts, nutrition, and recovery.

                            Formatting rules:
                            - Use ## for section headings (like ## Breakfast, ## Lunch, ## Dinner)
                            - Never mix numbered lists and bullet points in the same section
                            - Use bullet points ( - ) for lists of items or options
                            - Use numbered lists only for sequential steps
                            - Add a blank line between sections
                            - Bold important terms with **term**
                            - Keep responses concise and scannable`
                    },
                    ...updatedMessage.map((m: any) => ({
                        role: m.role,
                        content: m.content
                    }))
                ]
            })
            const aiMessage = {
                role: 'assistant',
                content: response.choices[0].message.content || 'Sorry I could not get a response.'
            }
            setMessages([...updatedMessage, aiMessage])
        } catch (error){
            setMessages([...updatedMessage, {
                role: 'assistant',
                content: 'Sorry something went wrong. Please try again.'
            }])
        } finally{
            setIsLoading(false)
        }
    }
    return(
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            {/* Header */}
            <h2 style={{ color: '#f0e8e8', fontSize: '22px', marginLeft: '20px', marginTop: '20px'}}>
                🤖AI Coach
            </h2>
            <p style={{ color: '#a08080', fontSize: '12px', marginLeft: '22px', marginTop:'4px'}}>Your personal fitness assistant</p>

            {/* Messages area - grows to fill space */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {messages.map((message, index) => (
                    <div key = {index} style={{ 
                        display: 'flex',
                        justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '10px'
                    }}>
                        {message.role === 'assistant' && (
                            <div style={{
                                display: 'flex',
                                borderRadius: '50%',
                                background: '#f95826',
                                height: '20px',
                                width: '20px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                                marginTop: '15px'
                            }}>
                                <p style={{fontSize: '18px'}}>🤖</p>
                            </div>
                        )}
                            
                        <div style={{
                            borderRadius: '10px',
                            background: message.role === 'user' ? '#f95826' : '#473630',
                            maxWidth: '75%',
                            color: '#f0e8e8',
                            fontSize: '14px',
                            marginLeft: '10px',
                            marginTop: '18px',
                            padding: '12px'
                        }}>
                            {message.role === 'user' ? message.content : 
                            <ReactMarkdown
                                components={{
                                    p: ({children}) => <p style={{ margin: '6px 0', color: '#f0e8e8' }}>{children}</p>,
                                    strong: ({children}) => <strong style={{ color: '#f0e8e8', fontWeight: 'bold' }}>{children}</strong>,
                                    ul: ({children}) => <ul style={{ margin: '6px 0', paddingLeft: '18px', color: '#f0e8e8' }}>{children}</ul>,
                                    ol: ({children}) => <ol style={{ margin: '6px 0', paddingLeft: '18px', color: '#f0e8e8' }}>{children}</ol>,
                                    li: ({children}) => <li style={{ margin: '4px 0', color: '#f0e8e8' }}>{children}</li>,
                                    h2: ({children}) => <h2 style={{ fontSize: '15px', fontWeight: 'bold', margin: '12px 0 6px', color: '#E8603C' }}>{children}</h2>,
                                    h3: ({children}) => <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '10px 0 4px', color: '#f0e8e8' }}>{children}</h3>,
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <div style={{
                            borderRadius: '50%',
                            background: '#f95826',
                            height: '20px',
                            width: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px',
                            marginRight: '10px',
                            flexShrink: 0
                        }}>
                            🤖
                        </div>
                        <div style={{
                            borderRadius: '18px 18px 18px 4px',
                            background: '#473630',
                            padding: '12px 16px',
                            color: '#a08080',
                            fontSize: '14px'
                        }}>
                            Thinking...
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div style={{
                padding: '12px 16px',
                display: 'flex',
                marginBottom: '90px',
                gap: '10px'
            }}>
                <input
                    value = {input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask your coach..."
                    style={{
                        background: '#473630',
                        borderRadius: '20px',
                        flex: 1,
                        padding: '12px 16px',
                        border: 'none',
                        color: '#f0e8e8',
                        fontSize: '14px',
                        outline: 'none'
                    }}
                />
                <div onClick={handleSend}
                style={{
                    display: 'flex',
                    borderRadius: '50%',
                    background: '#f95826',
                    height: '44px',
                    width: '44px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}>
                    ➤
                </div>
            </div>
        </div>
    )
}

export default Coach