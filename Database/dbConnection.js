const mongoose = require('mongoose')

function CreateMong(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Mongodb is Work'))
    .catch((err)=>console.log(err))
}

module.exports = CreateMong