const express = require("express");
const axios = require("axios");
const app = express();

const PROXY = "https://api.allorigins.win/get?url=";

// Proxy list of games
app.get("/games", async (req, res) => {
    try {
        const url = PROXY + encodeURIComponent("https://nenow.in/gamezone/games");
        const response = await axios.get(url);

        // allorigins wraps content in { contents: "..." }
        res.send(response.data.contents);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error loading games page");
    }
});

// Proxy individual game pages
app.get("/gamezone/game/:slug", async (req, res) => {
    try {
        const target = `https://nenow.in/gamezone/game/${req.params.slug}`;
        const url = PROXY + encodeURIComponent(target);

        const response = await axios.get(url);
        res.send(response.data.contents);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error loading game page");
    }
});

// Serve local files
app.use(express.static("."));

// Render dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
