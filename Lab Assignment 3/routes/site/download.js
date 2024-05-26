const express = require("express");
const router = express.Router();
const { Song, EnglishSong, All, Trending, Search, Short , HipHop, SadSong, NewEnglish, RockSong, BollywoodSong, Mashup, EnglishArtist} = require('../../models/songs');
const ytdl = require("ytdl-core");
// Download routes
router.get('/download/:collection/:songId', async (req, res) => {
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
        case 'rock_songs':
          model = RockSong;
          break;
        case 'bollywood_songs':
          model = BollywoodSong;
          break;
        case 'mashup_songs':
          model = Mashup;
          break;
        case 'english_artists':
          model = EnglishArtist;
          break;
        default:
          return res.status(404).json({ error: 'Invalid collection' });
      }
  
      const song = await model.findById(songId);
      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }
  
      const sanitizedFileName = song.name.replace(/[^\w\s]/gi, '');
      const fileName = encodeURIComponent(sanitizedFileName) + '.mp3';
  
      const audioStream = ytdl(song.url, { filter: 'audioonly' });
      res.set('Content-Type', 'audio/mpeg');
      res.set('Content-Disposition', `attachment; filename="${fileName}"`);
      audioStream.pipe(res);
    } catch (error) {
      console.error('Error downloading song:', error);
      res.status(500).json({ error: 'Error downloading song' });
    }
  });
  
  router.get('/download/:collection/:artistId/:songIndex', async (req, res) => {
    const { collection, artistId, songIndex } = req.params;
    try {
      let model;
      switch (collection) {
        case 'english_artists':
          model = EnglishArtist;
          break;
        case 'hindi_artists':
          model = HindiArtist;
          break;
        default:
          return res.status(404).json({ error: 'Invalid collection' });
      }
  
      const artist = await model.findById(artistId);
      if (!artist) {
        return res.status(404).json({ error: 'Artist not found' });
      }
  
      const index = parseInt(songIndex);
      if (isNaN(index) || index < 0 || index >= artist.songs.length) {
        return res.status(404).json({ error: 'Invalid song index' });
      }
  
      const song = artist.songs[index];
      const sanitizedFileName = song.song_title.replace(/[^\w\s]/gi, '');
      const fileName = encodeURIComponent(sanitizedFileName) + '.mp3';
  
      const audioStream = ytdl(song.song_url, { filter: 'audioonly' });
      res.set('Content-Type', 'audio/mpeg');
      res.set('Content-Disposition', `attachment; filename="${fileName}"`);
      audioStream.pipe(res);
    } catch (error) {
      console.error('Error downloading song:', error);
      res.status(500).json({ error: 'Error downloading song' });
    }
  });
  
  module.exports = router;
  