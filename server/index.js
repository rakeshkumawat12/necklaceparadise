import express from "express";
import connectToDB from "./database/mongoDb.js";
import UserRoutes from "./routes/user.route.js"
import ProductRoutes from "./routes/product.route.js";
import CategoryRoutes from "./routes/category.route.js"
import CartRoutes from "./routes/cart.route.js"
import paymentRoutes from "./routes/payment.route.js"
import cors from "cors";
import env from "dotenv";
env.config();

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/auth", UserRoutes)
app.use("/api/product", ProductRoutes)
app.use("/api/category", CategoryRoutes)
app.use("/api/cart", CartRoutes)
app.use("/api/payment", paymentRoutes)


app.all("*", (req, res) => {
    res.status(404).send("Page Not Found!");
});

const PORT = process.env.port || 5001
app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`);
    connectToDB();
})