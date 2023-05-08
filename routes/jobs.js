
const { Router } = require('express') 
const pool = require('../config/db')

const router = Router()

router.get('/',async (req, res) => {
    try {
        const jobs = await pool.query("SELECT * FROM job")  
        res.status(200).json(jobs.rows) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )

router.post('/add',async (req, res) => {
    try {
        const newJob = await pool.query(`
            INSERT INTO job (title) VALUES ($1) RETURNING *
        `, [req.body.title])

        res.status(201).json(newJob.rows) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )

router.post('/update/:id', async(req, res) => {
    try {
        const id = req.params.id
        const {title} = req.body
        const updatedJob = await pool.query(`
            UPDATE employer SET title=$1 WHERE id=$5 RETURNING *
        `, [title, id])

        res.status(201).json(updatedJob.rows) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )
 
module.exports = router

