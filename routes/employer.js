
const { Router } = require('express') 
const pool = require('../config/db')

const router = Router()

router.get('/',async (req, res) => {
    try {
        const jobs = await pool.query("SELECT * FROM employer")  
        res.status(200).json(jobs.rows) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )

router.post('/add',async (req, res) => {
    try {
        const {name, salary, degree, job_id} = req.body
        const newEmployer = await pool.query(`
            INSERT INTO employer (name, degree, salary, job_id) VALUES ($1, $2, $3, $4) RETURNING *
        `, [name, degree, salary,job_id])

        res.status(201).json(newEmployer.rows) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )

router.post('/update/:id', async(req, res) => {
    try {
        const id = req.params.id
        const {name, salary, degree, job_id} = req.body
        const updatedEmployer = await pool.query(`
            UPDATE employer SET name=$1, degree=$2, salary=$3, job_id=$4 WHERE id=$5 RETURNING *
        `, [name, degree, salary,job_id, id])

        res.status(201).json(updatedEmployer.rows) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} )
 
module.exports = router

