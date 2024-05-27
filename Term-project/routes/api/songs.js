const express = require("express");
const router = express.Router();

const { Song, EnglishSong, All, Trending, Search, Short, HipHop ,SadSong, NewEnglish, RockSong, BollywoodSong, Mashup,  EnglishArtist, HindiArtist} = require('../../models/songs');

const getModelByCollection = (collection) => {
    switch (collection) {
        case 'songs': return Song;
        case 'all_songs': return All;
        case 'english_songs': return EnglishSong;
        case 'bollywood_songs': return BollywoodSong;
        case 'mashup_songs': return Mashup;
        case 'new_english_songs': return NewEnglish;
        case 'rock_songs': return RockSong;
        case 'hiphop_songs': return HipHop;
        case 'sad_songs': return SadSong;
        case 'short_songs': return Short;
        case 'trending_songs': return Trending;
        case 'english_artists': return EnglishArtist;
        case 'hindi_artists': return HindiArtist;
        case 'search_songs': return Search;
        default: throw new Error("Invalid collection name");
    }
};

// GET all items in the collection
router.get("/:collection", async (req, res) => {
    const { collection } = req.params;
    try {
        const model = getModelByCollection(collection);
        const items = await model.find();
        res.send(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET a single item by ID
router.get("/:collection/:id", async (req, res) => {
    const { collection, id } = req.params;
    try {
        const model = getModelByCollection(collection);
        const item = await model.findById(id);
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.send(item);
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).send("Internal Server Error");
    }
});

// POST a new item to the collection
router.post("/:collection", async (req, res) => {
    const { collection } = req.params;
    try {
        const model = getModelByCollection(collection);
        const newItem = new model(req.body);
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).send("Internal Server Error");
    }
});

// PUT update an item by ID
router.put("/:collection/:id", async (req, res) => {
    const { collection, id } = req.params;
    try {
        const model = getModelByCollection(collection);
        const updatedItem = await model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedItem) {
            return res.status(404).send("Item not found");
        }
        res.send(updatedItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).send("Internal Server Error");
    }
});

// DELETE an item by ID
router.delete("/:collection/:id", async (req, res) => {
    const { collection, id } = req.params;
    try {
        const model = getModelByCollection(collection);
        const deletedItem = await model.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).send("Item not found");
        }
        res.send(deletedItem);
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;