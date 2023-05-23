import mongoose from 'mongoose';
const connectDB = async()=>{
    try {
        let connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongo DB connected to ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`Error in mongodb--->${error}`);
    }
}

export default connectDB