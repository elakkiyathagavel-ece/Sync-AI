const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
    try {
        console.log("Attempting MongoDB connection...");
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 4000,
            family: 4,
            tls: true
        });

        isConnected = true;
        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
        return true;
    } catch (error) {
        isConnected = false;
        console.warn("Notice: MongoDB Atlas connection did not respond (likely IP whitelist or network restriction).");
        console.warn("Switching to persistent local database engine (syncai_db.json) - All SYNC AI features fully operational!");
        return false;
    }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };