/*
    SOME BACKEND NOTES:
        GET     → "give me data"       (reading)
        POST    → "here's new data"    (creating)
        PUT     → "update this"        (editing)
        DELETE  → "remove this"        (deleting)

        *req contains:

        req.body — data the client sent (for POST/PUT requests)
        req.params — URL variables like the 1 in /workouts/1
        req.headers — metadata about the request (including auth tokens later)

        *res contains:

        res.json(data) — sends JSON back to the client
        res.send(text) — sends plain text back
        res.status(404).json({error: 'Not found'}) — sends a status code + message

*/


//Packages from node_modules 
import express from 'express' // Handles request/response machinery

import cors from 'cors' // Handles cross-origin permissions

import { initDB } from './database' // this runs database.ts when the server starts

import workoutRouter from './routes/workouts' 

import mealsRouter from './routes/meals'

// Receptionist -> receives every incoming request, and decides which handler to route it to.
const app = express()
/*
    VITE frontend is on 5173 by default, they need different ports
    because two programs can't share the same door
*/

const PORT = 3001

/*
    - app.use() -> code that runs on every request before it reaches any specific route handler.
    - cors() specifically adds a header to every response saying "I allow requests from other 
        origins." Without this, when React app on localhost:5173 tries to call server on localhost:3001, 
        the browser blocks it

    - In summary, app.use() says apply this to every request, and the "this" is the cors() functionality 
        which allows one origin to talk to the other.
*/
app.use(cors())

/*
    - Again app.use() applies for every request
    - This tells Express if a request comes in with JSON data in its body 
        automatically pasrse it into JavaScript object -> req.body
    - This matters for POST & PUT requests; when React sends a new Workout to the server: without express.json()
        the handler would receive that as raw text. Express parses it and makes it available as req.body

*/
app.use(express.json())

// This says that any request that starts with /workouts, hand it off to workoutRouter to handle (when we imported the route we called it workoutRouter). 
app.use('/workouts', workoutRouter)
app.use('/meals', mealsRouter)

/*
    FOR TESTING:
        - app.get() -> give me data
        - '/' is the root (http://localhost:3001/) 
        - res.send() -> display text when we visit the URL
*/
app.get('/', (req, res) => {
    res.send('FitForge server is running!')
})

/*
    - app.listen(PORT, ...) is what opens the door on port 3001 and starts accepting incoming requests.
*/
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.error('Failed to initialize database:', err)
})

/*
    FLOW:
        You typed localhost:3001 in browser
                ↓
        Browser sends GET request to port 3001
                ↓
        app.listen() receives it
                ↓
        app.use(cors()) runs → adds permission headers
                ↓
        app.use(express.json()) runs → checks for JSON body (none here)
                ↓
        Express checks routes: does GET / match anything?
                ↓
        Yes → runs the app.get('/', ...) handler
                ↓
        res.send('FitForge server is running!') fires
                ↓
        Response travels back to browser
                ↓
        Browser displays the text
*/