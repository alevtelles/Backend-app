import mongoose from "mongoose";
import {config }  from "./app.config";

const connectDatabase = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Conectado ao banco de dados Mongo");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados", error);
        process.exit(1);
    }
}

export default connectDatabase;