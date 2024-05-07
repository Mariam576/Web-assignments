// Import mongoose
const mongoose = require('mongoose');

// Define all_songs schema and model
const allSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String,
    language: String
});
const All = mongoose.model('all_songs', allSchema);

// Define english_songs schema and model
const englishSongSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String
});
const EnglishSong = mongoose.model('english_songs', englishSongSchema);

// Define search_songs schema and model
const searchSongSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String,
    language: String
});
const Search = mongoose.model('search_songs', searchSongSchema);

// Define short_songs schema and model
const shortsSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String
});
const Short = mongoose.model('short_songs', shortsSchema);

// Define songs schema and model
const songSchema = new mongoose.Schema({
    name: String,
    artists: [String],
    album: String,
    url: String,
    imageUrl: String
});
const Song = mongoose.model('songs', songSchema);

// Define trending_songs schema and model
const trendingSongSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String
});
const Trending = mongoose.model('trending_songs', trendingSongSchema);
const hiphopSongSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String
});
const HipHop = mongoose.model('hiphop_songs', hiphopSongSchema);
const SadSongSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String

});
const SadSong = mongoose.model('sad_songs', SadSongSchema);
const NewEnglishSongSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String

});
const NewEnglish = mongoose.model('new_english_songs', NewEnglishSongSchema);

// Export all models
module.exports = {
    All,
    EnglishSong,
    Search,
    Short,
    Song,
    Trending,
    HipHop,
    SadSong,NewEnglish,
};
