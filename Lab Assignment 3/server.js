const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const { Song, EnglishSong, All, Trending, Search, Short,HipHop, SadSong, NewEnglish } = require("./models/songs");

const { promisify } = require('util');
const { pipeline } = require('stream');
const axios = require('axios');


const PORT = 3000;
const server = express();

server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(require("express-ejs-layouts"));
server.use(express.urlencoded({ extended: true }));

// Routes
server.use("/api", require("./routes/api/songs"));

server.use("/", require("./routes/site/songs"));


const artistFilePath = path.join(__dirname, "hindi_artists.json");
let hindiArtists = [];
try {
    const artistData = fs.readFileSync(artistFilePath);
    hindiArtists = JSON.parse(artistData);
} catch (error) {
    console.error("Error reading artist data from JSON file:", error);
}

server.get("/", function(req, res) {
    res.render("homepage");
});
server.get("/contactUs.html", function(req, res) {
    res.render("contactUs");
});


server.get("/api/artists", function(req, res) {
    res.json(hindiArtists);
});

server.get('/download/:collection/:songId', async (req, res) => {
    const { collection, songId } = req.params;

    try {
       
        let model;
        switch (collection) {
            case 'songs':
                model = Song;
                break;
            case 'short_songs':
                model = Short;
                break;
            case 'all_songs':
                model = All;
                break;
            case 'search_songs':
                model = Search;
                break;
            case 'trending_songs':
                model = Trending;
                break;
            case 'english_songs':
                model = EnglishSong;
                break;
            case 'hiphop_songs':
                 model = HipHop;
                break;
            case 'sad_songs':
                    model = SadSong;
                   break;
            case 'new_english_songs':
                    model = NewEnglish;
                   break;
            default:
                return res.status(404).json({ error: 'Invalid collection' });
        }

        // Find the song by ID in the determined model
        const song = await model.findById(songId);

        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        // Prepare filename for download
        const sanitizedFileName = song.name.replace(/[^\w\s]/gi, '');
        const fileName = encodeURIComponent(sanitizedFileName) + '.mp3';

        // Stream the audio to the response
        const audioStream = ytdl(song.url, { filter: 'audioonly' });
        res.set('Content-Type', 'audio/mpeg');
        res.set('Content-Disposition', `attachment; filename="${fileName}"`);
        audioStream.pipe(res);
    } catch (error) {
        console.error('Error downloading song:', error);
        res.status(500).json({ error: 'Error downloading song' });
    }
});
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Saggitarius", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log("MongoDB Connected");

  
  

    server.listen(PORT, function() {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});