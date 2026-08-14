import { Router } from 'express'

import { getDB, saveDB } from '../database'

const router = Router()

/*
meals table:
    | id | type | name | calories | ---
*/

router.get('/', (req, res) => {
    const db = getDB()

    const meal = db.exec(`SELECT * FROM meals`)

    if (meal.length === 0){
        res.json({
            breakfast: [],
            lunch: [],
            dinner: [],
            snacks: []
        })
        return
    }

    const sortedMeal : any = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    }
    
    /*
        - We can access the arrays in sortedMeal by doing sortedMeal.breakfast or sortedMel['breakfast'] 
        - We use map when we create a new array and forEach if we're filling up an existing array
    */

    meal[0].values.forEach((row : any) => {
        const [id, type, name, calories, protein, carbs, fat] = row

        sortedMeal[type].push({id, name, calories, protein, carbs, fat})
    })

    res.json(sortedMeal)
})

router.post('/', (req, res) => {
    const db = getDB()

    const {type, name, calories, protein, carbs, fat} = req.body

    if (!type || !name){
        res.status(400).json({error: 'type and name are required'})
        return
    }

    db.run(`INSERT INTO meals (type, name, calories, protein, carbs, fat) VALUES (?, ?, ?, ?, ?, ?)`, [type, name, calories || '', protein || '', carbs || '', fat || ''])

    const result = db.exec('SELECT last_insert_rowid()')
    const id = result[0].values[0][0]

    saveDB()

    res.status(201).json({id, type, name, calories, protein, carbs, fat})
})

router.put('/:id', (req, res) => {
    const db = getDB()
    const {id} = req.params
    const {name, calories, protein, carbs, fat} = req.body

    db.run(`UPDATE meals SET name = ?, calories = ?, protein = ?, carbs = ?, fat = ? WHERE id = ?`, [name, calories, protein, carbs, fat, id])

    saveDB()
    res.json({success : true})
})

router.delete('/:id', (req, res) => {
    const db = getDB()
    const {id} = req.params

    db.run(`DELETE FROM meals WHERE id = ?`, [id])

    saveDB()
    res.json({success : true})
})

export default router