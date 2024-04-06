const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI)

const connectToMongo = async () => {
    try {
        let connected = await mongoose.connections[0]
        // connected[0]
        if (connected) {
            console.log("Connected with DB")
        } else {
            throw err
        }
    } catch (err) {
        console.log("Opps! Connection with mongo db failed", err)
    }

}

module.exports = connectToMongo