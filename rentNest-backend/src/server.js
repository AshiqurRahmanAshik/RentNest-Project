import dotenv from "dotenv";
import { prisma } from "./lib/prisma";
import app from "./app";
dotenv.config();
const port = process.env.PORT || 8000;
async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to Database Successfully");
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    }
    catch (error) {
        console.error("Server failed to start", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
