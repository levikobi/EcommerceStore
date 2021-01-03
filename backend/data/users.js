import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", process.env.SALT_ROUNDS),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("123456", process.env.SALT_ROUNDS),
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync("123456", process.env.SALT_ROUNDS),
    },
];

export default users;
