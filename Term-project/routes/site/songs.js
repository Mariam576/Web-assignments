const express = require("express");
const router = express.Router();
const { Song, EnglishSong, All, Trending, Search, Short , HipHop, SadSong, NewEnglish, RockSong, BollywoodSong, Mashup, EnglishArtist} = require('../../models/songs');

const isAuthenticated = require("../../middlewares/isAuthenticated");
const ITEMS_PER_PAGE = 6;


router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const totalSongs = await Song.countDocuments();
        const totalPages = Math.ceil(totalSongs / ITEMS_PER_PAGE);
        const englishSongs = await EnglishSong.find();
       
        const songs = await Song.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        res.render("homepage", {
            songs,
            englishSongs,
            totalPages,
            
            currentPage: page,
            collection: 'songs',
            collection_name: 'english_songs',
            collection_name_3: 'hiphop_songs',
            collection_name_4:'top_english_artist',
        });
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).send("Internal Server Error");
    }
});
    router.get('/search-results', async (req, res) => {
        try {
            const { query } = req.query;
    
            
            const songMatches = await Search.find({
                $or: [
                    { name: { $regex: new RegExp(query, "i") } }, 
                    { artists: { $regex: new RegExp(query, "i") } }
                ]
            });
    
            res.render('search-results', { songMatches, collection:'search_songs' });
        } catch (error) {
            console.error('Error fetching search results:', error);
            res.status(500).send('Internal Server Error');
        }
    });
    

    
router.get('/song-details', async (req, res) => {
    try {
        const songId = req.query.id;

       
        const song = await Song.findById(songId);

       

        
        const trending = await Trending.findById(songId);
        const englishSong= await EnglishSong.findById(songId);
        const search=await Search.findById(songId);
        const short=await Short.findById(songId);
        const all= await All.findById(songId);
        
       const hiphop=await HipHop.findById(songId);
       const sad_song=await SadSong.findById(songId);
       const newEnglish=await NewEnglish.findById(songId);
       const rock_song=await RockSong.findById(songId) ;
       const bollywood_song=await BollywoodSong.findById(songId);
       const mashup=await Mashup.findById(songId);
       
      
    


        res.render("song-details", { song, trending,englishSong ,search, short,all, hiphop, sad_song,newEnglish,rock_song,bollywood_song,mashup});
    } catch (error) {
        console.error("Error fetching song details:", error);
       
        res.status(500).send("Internal Server Error");
    }
});

router.get("/allSongs/:collection", async (req, res) => {
    const { collection } = req.params;
    try {
        let songs;
        switch(collection) {
            case 'all_songs':
                songs = await All.find();
                break;
            case 'bollywood_songs':
                songs = await BollywoodSong.find();
                break;
            case 'mashup_songs':
                songs = await Mashup.find();
                break;
            case 'new_english_songs':
                songs = await NewEnglish.find();
                break;
            case 'rock_songs':
                songs = await RockSong.find();
                break;
            case 'hiphop_songs':
                songs = await HipHop.find();
                break;
            case 'sad_songs':
                songs = await SadSong.find();
                break;
            case 'short_songs':
                songs = await Short.find();
                break;
            case 'trending_songs':
                songs = await Trending.find();
                break;
            default:
                throw new Error("Invalid collection name");
        }
        res.render("allSongs", {
            songs: songs,
            collection: collection
        });
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).send("Internal Server Error");
    }
});

  router.post('/addMusic',isAuthenticated, async (req, res) => {
   let record= new Search(req.body);
   await record.save();
  
  return res.redirect("/");
});

router.get('/addMusic', async (req, res) => {
   
   
    res.render("addMusic")
 });
 router.get("/", (req, res) => {
    res.render("homepage");
  });
  
  
 
  router.get("/token", isAuthenticated, (req, res) => {
    res.render("token");
  });



module.exports = router;
