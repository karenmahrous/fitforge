import initSqlJs, { Database } from 'sql.js'
import fs from 'fs'
import path from 'path'
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

    - Each column has a type — TEXT for strings, INTEGER for whole numbers
    - PRIMARY KEY AUTOINCREMENT -> Every row needs a unique identifier so you can refer to it specifically\
    - FOREIGN KEY ->  This links each exercise back to its parent workout — exercises with workout_id = 1 belong to workout 1. 
    (FOREIGN KEY (workout_id) REFERENCES workouts(id))
    - CREATE TABLE IF NOT EXISTS -> the IF NOT EXISTS part means it only actually creates the table the first time. 
    - path.join(__dirname, '../../database.sqlite') -> __dirname is the current file's directory (server/src/), and 
    ../../database.sqlite goes two levels up to fitforge/database.sqlite. The file gets created automatically the first time 
    your server runs.
*/

const DB_PATH = path.join(__dirname, '../../database.sqlite')

let db: Database

export async function initDB(): Promise<Database> {
    const SQL = await initSqlJs()
    /*
        On first run the file doesn't exist yet, so we create a fresh empty database. 
        On every subsequent run the file exists, so we load it from disk into memory. 
        This is how the data persists between server restarts.
    */
    if (fs.existsSync(DB_PATH)) {
        const fileBuffer = fs.readFileSync(DB_PATH)
        db = new SQL.Database(fileBuffer)
        console.log('Loaded existing database from disk')
    } else {
        db = new SQL.Database()
        console.log('Created new database')
    }
    // sends an SQL command to the database
    db.run(`
        CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            day TEXT NOT NULL,
            date TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS exercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workout_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            sets TEXT,
            reps TEXT,
            FOREIGN KEY (workout_id) REFERENCES workouts(id)
        );

        CREATE TABLE IF NOT EXISTS meals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            name TEXT NOT NULL,
            calories TEXT,
            protein TEXT,
            carbs TEXT,
            fat TEXT
        );
    `)
    
    /*
         keeps the database entirely in memory. It doesn't automatically
         write to disk when you make changes — you have to explicitly call saveDB() 
         after any write operation (insert, update, delete). 
    */
    saveDB() 
    return db
}

// call saveDB() at the end of every route that changes data.
export function saveDB() {
    // takes in-memory database and converts it to raw bytes
    const data = db.export()
    // converts those bytes into a Node.js Buffer, which is what fs.writeFileSync expects
    const buffer = Buffer.from(data)
    // writes those bytes to the file at DB_PATH. fs is Node's built-in file system module
    // writeFileSync means "write this file and wait until it's done before moving on"
    fs.writeFileSync(DB_PATH, buffer)
}

export function getDB(): Database {
    return db
}