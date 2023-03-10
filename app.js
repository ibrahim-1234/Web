import express from 'express'
const router = express.Router()

const app = express()
const PORT = 80

app.use(express.static('views'))

router.get('/', (req, res)=>{
    res.render('index')
})

app.use('/', router)

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})

// "start": "lite-server --baseDir=\"views\""