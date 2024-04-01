const express = require("express");
const server = express();
const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const PORT = 3000;

// Middleware to serve static files
server.use(express.static("public"));

// Set the view engine to EJS
server.set("view engine", "ejs");

// Read playlist data from JSON file
const playlistFilePath = path.join(__dirname, "spotify_playlists_with_tracks_and_urls.json");
let playlists = [];
try {
    const playlistData = fs.readFileSync(playlistFilePath);
    playlists = JSON.parse(playlistData);
} catch (error) {
    console.error("Error reading playlist data from JSON file:", error);
}

// Read artist data from JSON file
const artistFilePath = path.join(__dirname, "hindi_artists.json");
let hindiArtists = [];
try {
    const artistData = fs.readFileSync(artistFilePath);
    hindiArtists = JSON.parse(artistData);
} catch (error) {
    console.error("Error reading artist data from JSON file:", error);
}

// Route to serve homepage
server.get("/", function(req, res) {
    res.render("homepage");
});
server.get("/contactUs.html", function(req, res) {
    res.render("contactUs");
});

// Route to serve songs data as JSON
server.get("/api/songs", function(req, res) {
    const hotHitsHindiPlaylist = playlists.find(playlist => playlist.name === "Hot Hits Hindi");
    if (!hotHitsHindiPlaylist) {
        return res.status(404).json({ error: "Hot Hits Hindi playlist not found in the data" });
    }
    res.json(hotHitsHindiPlaylist.tracks);
});

// Route to serve artist data as JSON
server.get("/api/artists", function(req, res) {
    res.json(hindiArtists);
});

// Route to download songs
server.get("/download/:songId", async function(req, res) {
    const songId = req.params.songId;
    const hotHitsHindiPlaylist = playlists.find(playlist => playlist.name === "Hot Hits Hindi");
    if (!hotHitsHindiPlaylist) {
        return res.status(404).json({ error: "Hot Hits Hindi playlist not found in the data" });
    }
    if (songId < 0 || songId >= hotHitsHindiPlaylist.tracks.length) {
        return res.status(404).json({ error: "Song not found" });
    }

    const song = hotHitsHindiPlaylist.tracks[songId];

    try {
        const audioStream = ytdl(song.url, { filter: 'audioonly' });
        
        res.set("Content-Type", "audio/mpeg");
        res.set("Content-Disposition", `attachment; filename="${song.name}.mp3"`);

        audioStream.pipe(res);
    } catch (error) {
        console.error("Error downloading song:", error);
        res.status(500).json({ error: "Error downloading song" });
    }
});


// Start the server
server.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
