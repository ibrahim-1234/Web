import express from 'express'
import router from './routes/home.js'

 
const app = express()
const PORT = process.env.PORT || 3000


app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use('/', router)

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})
