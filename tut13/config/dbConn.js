import { connect } from "mongoose";

const connectDB = async () => {
    try {
        await connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewURLParser: true
        });
    } catch (err) {
        console.log(err);
    }
}

export default connectDB