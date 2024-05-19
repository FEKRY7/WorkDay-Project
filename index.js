const express  = require('express')
const app = express()

const CreateMong = require('./Database/dbConnection.js')
const cors = require('cors')

const jop = require('./src/Router/JopRouter.js')
const company = require('./src/Router/CompanyRouter')
const user = require('./src/Router/UsersRouter.js')

require('dotenv').config()


// Set up server to listen on specified port (default to 3000)
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

CreateMong()

// Middleware
app.use(cors())
app.use(express.json())


// Routes
app.use('/api/jop',jop)
app.use('/api/company',company)
app.use('/api/user',user)


// 404 route
app.use('*',(req,res)=>{
res.status(404).json({'MsG':'I Cant Found Page'})
})