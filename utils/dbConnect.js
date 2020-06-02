const mongoose = require('mongoose');


const connection = {};


async function dbConnect(MONGO_URI){
    if(connection.isConnected){
        return; 
    }

try {

    const db = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    })

    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
    
} catch (error) {
    console.log(error)
    throw error; 
        
}

    
}

module.exports = dbConnect;