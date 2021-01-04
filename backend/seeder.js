import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

/**
 * Data seeder script that deletes everything from the DB, and then inserts
 * the static sample data from ./data/users.js & ./data/products.js
 *
 * @example npm run data:import
 */
const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        // Make sure the first user in users.js is indeed an admin.
        const adminUserId = createdUsers[0]._id;
        // Each product must have a reference to an admin.
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUserId };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

/**
 * Data seeder script that simply deletes everything from the DB.
 *
 * @example npm run data:destroy
 */
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
