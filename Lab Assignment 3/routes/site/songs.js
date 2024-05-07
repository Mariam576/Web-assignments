const express = require("express");
const router = express.Router();
const { Song, EnglishSong, All, Trending, Search, Short , HipHop, SadSong, NewEnglish} = require('../../models/songs');


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
            collection_name_3: 'hiphop_songs'
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
       const newEnglish=await NewEnglish.findById(songId) 

        res.render("song-details", { song, trending,englishSong ,search, short,all, hiphop, sad_song,newEnglish});
    } catch (error) {
        console.error("Error fetching song details:", error);
       
        res.status(500).send("Internal Server Error");
    }
});

router.get("/allSongs", async (req, res) => {
    try {
        
        const alls = await All.find();

       
        
        
        res.render("allSongs", {
            songs: alls,
            collection: 'all_songs',
           
        });
    } catch (error) {
        console.error("Error fetching all songs:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/newEnglish", async (req, res) => {
    try {
        
        const new_english_songs = await NewEnglish.find();

       
        
        
        res.render("newEnglish", {
            songs: new_english_songs,
            collection: 'new_english_songs',
           
        });
    } catch (error) {
        console.error("Error fetching all songs:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/hiphopSongs", async (req, res) => {
    try {
        
       

       
        const hiphops = await HipHop.find();

        
        res.render("hiphopSongs", {
           
            songs: hiphops,
            collection: 'hiphop_songs'
        });
    } catch (error) {
        console.error("Error fetching all songs:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/SadSongs", async (req, res) => {
    try {
        
       

       
        const sad_songs = await SadSong.find();

        
        res.render("SadSongs", {
           
            songs: sad_songs,
            collection: 'sad_songs'
        });
    } catch (error) {
        console.error("Error fetching all songs:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/ShortSongs", async (req, res) => {
    try {
        const shorts = await Short.find();
       
        res.render("ShortSongs", {songs: shorts, collection: 'short_songs' });
    } catch (error) {
        console.error("Error fetching all songs:", error);
        res.status(500).send("Internal server error");
    }
  });
  router.get("/TrendingSongs", async (req, res) => {
    try {
        const trendings = await Trending.find();
       
        res.render("TrendingSongs", {songs: trendings ,collection: 'trending_songs'});
    } catch (error) {
        console.error("Error fetching all songs:", error);
        res.status(500).send("Internal server error");
    }
  });
 
  router.post('/addMusic', async (req, res) => {
   let record= new Search(req.body);
   await record.save();
  
  return res.redirect("/");
});
router.get('/addMusic', async (req, res) => {
   
   
    res.render("addMusic")
 });


module.exports = router;
