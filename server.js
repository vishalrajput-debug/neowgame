const express = require("express");
const axios = require("axios");
const app = express();

// Proxy the list of games
app.get("/games", async (req, res) => {
    try {
        const response = await axios.get("https://nenow.in/gamezone/games");
        res.send(response.data);
    } catch (err) {
        res.status(500).send("Error loading games page");
    }
});

// Proxy individual game pages
app.get("/gamezone/game/:slug", async (req, res) => {
    try {
        const url = `https://nenow.in/gamezone/game/${req.params.slug}`;
        const response = await axios.get(url);
        res.send(response.data);
    } catch (err) {
        res.status(500).send("Error loading game page");
    }
});

// Serve local files (index.html)
app.use(express.static("."));

// IMPORTANT: Render/Railway require dynamic PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
