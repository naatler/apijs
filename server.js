const express = require("express");

const app = express();

app.use(express.json());

let users = [
    {id: 1, name: "Nadlar", email: "Nadlar@example.com"},
    {id: 2, name: "Muhammad", email: "Muhammad@example.com"},
    {id: 3, name: "Aditya", email: "Aditya@example.com"},
];

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User  not found" });
    }

    res.json(user);
});

app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    const newUser  = {
        id: users.length + 1,
        name,
        email,
    };

    users.push(newUser );
    res.status(201).json(newUser );
});

app.put("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    let user = users.find((u) => u.id === userId);

    user.name = name;
    user.email = email;

    res.json(user);
});

app.delete("/api/users/:id", (req, res) => { 
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId); 

    if (!user) {
        return res.status(404).json({ message: "User  not found" }); 
    }

    users = users.filter((u) => u.id !== userId); 
    res.status(204).send(); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
