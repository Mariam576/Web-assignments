// Import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
const RockSongSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String

});
const RockSong = mongoose.model('rock_songs', RockSongSchema);
const BollywoodSongSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String

});
const BollywoodSong = mongoose.model('bollywood_songs',  BollywoodSongSchema);
const MashupSchema = new mongoose.Schema({
    name: String,
    url: String,
    thumbnail: String

});
const Mashup = mongoose.model('mashup_songs',  MashupSchema);



// Define the Song schema
const SongSchema = new Schema({
    song_title: String,
       
    song_url:  String,
        
    
});

// Define the Artist schema
const ArtistSchema = new Schema({
    artist_title: 
        String,
        
    
    artist_thumbnail: String,
      
    songs: {
        type: [SongSchema],
        default: []
    }
});

const EnglishArtist = mongoose.model('english_artists', ArtistSchema);
// Define the Song schema
const SongSchema2 = new Schema({
    song_title: String,
       
    song_url:  String,
        
    
});

// Define the Artist schema
const HindiArtistSchema = new Schema({
    artist_title: 
        String,
        
    
    artist_thumbnail: String,
      
    songs: {
        type: [SongSchema2],
        default: []
    }
});

const HindiArtist = mongoose.model('hindi_artists', HindiArtistSchema);
// Export all models
module.exports = {
    All,
    EnglishSong,
    Search,
    Short,
    Song,
    Trending,
    HipHop,
    SadSong,NewEnglish,RockSong,BollywoodSong,Mashup,EnglishArtist,HindiArtist
};
