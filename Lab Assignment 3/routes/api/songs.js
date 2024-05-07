const express = require("express");
const router = express.Router();

const { Song, EnglishSong, All, Trending, Search, Short, HipHop ,SadSong, NewEnglish} = require('../../models/songs');

// Route for fetching all songs
router.get("/all", async (req, res) => {
  try {
    const alls = await All.find();
    res.json(alls);
  } catch (err) {
    console.error("Error fetching all songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for fetching English songs
router.get("/Englishsongs", async (req, res) => {
  try {
    const englishSongs = await EnglishSong.find();
    res.json(englishSongs);
  } catch (err) {
    console.error("Error fetching English songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for searching songs
router.get("/search", async (req, res) => {
  try {
    const searches = await Search.find();
    res.json(searches);
  } catch (err) {
    console.error("Error fetching search results:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for fetching short songs
router.get("/shorts", async (req, res) => {
  try {
    const shorts = await Short.find();
    res.json(shorts);
  } catch (err) {
    console.error("Error fetching short songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for fetching all songs (general)
router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for fetching trending songs
router.get("/trending", async (req, res) => {
  try {
    const trendings = await Trending.find();
    res.json(trendings);
  } catch (err) {
    console.error("Error fetching trending songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/HipHop", async (req, res) => {
  try {
    const hiphops = await HipHop.find();
    res.json(hiphops);
  } catch (err) {
    console.error("Error fetching trending songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/SadSong", async (req, res) => {
  try {
    const sad_songs = await SadSong.find();
    res.json(sad_songs);
  } catch (err) {
    console.error("Error fetching trending songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/NewEnglish", async (req, res) => {
  try {
    const new_english_songs = await NewEnglish.find();
    res.json(new_english_songs);
  } catch (err) {
    console.error("Error fetching trending songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
