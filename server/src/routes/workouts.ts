import { Router } from 'express'

// Get out one step from the folder to find Databae file
import { getDB, saveDB } from '../database'

/*
    SQL:
        SELECT * FROM workouts
        -- "give me everything from the workouts table"

        INSERT INTO workouts (name, day, date) VALUES ('Push Day', 'Monday', '2026-05-27')
        -- "add a new row to workouts with these values"

        DELETE FROM workouts WHERE id = 1
        -- "remove the row from workouts where id equals 1"
*/

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

/*
    workouts table:
    | id | name      | day      | date       |
    |----|-----------|----------|------------|
    | 1  | Push Day  | Monday   | 2026-05-27 |
    | 2  | Pull Day  | Wednesday| 2026-05-27 |

    exercises table:
    | id | workout_id | name          | sets | reps |
    |----|------------|---------------|------|------|
    | 1  | 1          | Bench Press   | 4    | 10   |
    | 2  | 1          | Shoulder Press| 3    | 12   |
    | 3  | 2          | Pull Ups      | 4    | 8    |
*/

// inde.ts has one app object that handles everthing, Router is a minik version of app
// Then in index.ts you mount it as a path: app.use('/workouts', workoutRouter) -> for every request that starts with /workouts use workoutRouter
const router = Router()

// at /workouts
router.get('/', (req, res) => {
    /*
        - This gives back the in-memory database object so we can run SQL against it.
        - We  do this at the start of every route handler that needs the database.
    */
        const db = getDB()
    /*
        - rule: if you're reading → exec. If you're writing → run.
        - This returns: 
            [
                {
                    columns: ['id', 'name', 'day', 'date'],
                    values: [
                        [1, 'Push Day', 'Monday', '2026-05-27'],
                        [2, 'Pull Day', 'Wednesday', '2026-05-27'],
                    ]
                }
            ]
        - 
    */
    const workouts = db.exec('SELECT * FROM workouts')
    
    // Empty workout array
    if (workouts.length === 0) {
        res.json([])
        return
    }

    /*
        - workouts[0]: the outer array always has one item per SELECT statement ran. 
        Since we ran one SELECT, you always just want index [0].
        - workouts[0].values: this is the array of rows. Each row is itself an array of values in column order.
        - .map(): Loops over every row
        - row: [1, 'Push Day', 'Monday', '2026-05-27']
    */

    const rows = workouts[0].values.map((row: any) => {
        /*
            [1, 'Push Day', 'Monday', '2026-05-27']
        */
        const [id, name, day, date] = row

        const exercises = db.exec(
            `SELECT * FROM exercises WHERE workout_id = ${id}`
        )

        // Loop over exercics otherwise return empty array
        const exerciseRows = exercises.length > 0
            ? exercises[0].values.map((e: any) => ({
                id: e[0],
                name: e[2],
                sets: e[3],
                reps: e[4]
            }))
            : []

        return { id, name, day, date, exercises: exerciseRows }
    })
    // Automatically converts the JavaScript array to JSON and sets the right headers.
    res.json(rows)
})

// POST a new workout
router.post('/', (req, res) => {
    const db = getDB()
    /*
        req.body will give {} so it destructs the array & we don't need [0]
    */
    const { name, day, date, exercises } = req.body

    if (!name || !day || !date) {
        res.status(400).json({ error: 'name, day and date are required' })
        return
    }

    /*
        id is not listed here because its AUTOINCREMENT
    */
    db.run(
        `INSERT INTO workouts (name, day, date) VALUES (?, ?, ?)`,
        [name, day, date]
    )

    /*
        {
            "name": "Push Day",
            "day": "Monday", 
            "date": "2026-07-16",
            "exercises": [
                { "name": "Bench Press", "sets": "4", "reps": "10" }
            ]
        }

        - We need to find the id assigned bc because we're about to insert exercises that need to reference this workout via workout_id
        - last_insert_rowid() is a built-in SQLite function that returns the id of the most recently inserted row.
        - [0][0] -> gets only the first row then only the first object
    */
    const result = db.exec('SELECT last_insert_rowid()')
    const workoutId = result[0].values[0][0]

    // Check if the exercices array exists and if it's non-empty
    if (exercises && exercises.length > 0) {
        
        // Loop through every exercise
        for (const exercise of exercises) {
            
            // Skips blank exercises 
            if (exercise.name.trim() !== '') {
                db.run(
                    `INSERT INTO exercises (workout_id, name, sets, reps) VALUES (?, ?, ?, ?)`,
                    [workoutId, exercise.name, exercise.sets, exercise.reps]
                )
            }
        }
    }

    /*
      At this point the workout and all its exercises exist in the in-memory db object but haven't been written to disk yet. Calling saveDB() takes the current state of db, 
      converts it to bytes, and writes it to database.sqlite. Without this line, everything would vanish when the server restarts.  
    */
    saveDB()

    const newWorkout = {
        id: workoutId,
        name, day, date,
        exercises: exercises? exercises.filter((e: any) => e.name.trim() !== '') : []
    }

    res.status(201).json(newWorkout)
})

// DELETE a workout

/*
    /:id -> /workouts/3
*/
router.delete('/:id', (req, res) => {
    const db = getDB()
    /*
        - Since we defined /:id, req.params looks like { id: '3' }. Destructuring pulls out id exactly like we destructure req.body.
        Note it comes in as a string '3' not a number 3
        
        - When a request comes in for DELETE /workouts/3, Express fills req.params with an object matching your variable names to the actual URL values: req.params = { id: '3' }
    */
    const { id } = req.params // same as const id = req.params.id

    db.run(`DELETE FROM exercises WHERE workout_id = ?`, [id])
    db.run(`DELETE FROM workouts WHERE id = ?`, [id])
    saveDB()

    res.json({ success: true })
})

// PUT - update a workout
router.put('/:id', (req, res) => {
    const db = getDB()
    const { id } = req.params
    const { exercises } = req.body

    db.run(`DELETE FROM exercises WHERE workout_id = ?`, [id])

    if (exercises && exercises.length > 0) {
        for (const exercise of exercises) {
            if (exercise.name.trim() !== '') {
                db.run(
                    `INSERT INTO exercises (workout_id, name, sets, reps) VALUES (?, ?, ?, ?)`,
                    [id, exercise.name, exercise.sets, exercise.reps]
                )
            }
        }
    }

    saveDB()
    res.json({ success: true })
})

export default router