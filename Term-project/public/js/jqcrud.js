
function transformAndSubmit(event) {
    event.preventDefault(); 

    const urlInput = document.getElementById('url');
    const urlValue = urlInput.value.trim();

    
    const embedUrl = transformYouTubeUrl(urlValue);

    if (embedUrl) {
       
        urlInput.value = embedUrl;

        
        const form = document.getElementById('createForm');
        form.submit();
    } else {
        alert('Invalid YouTube URL. Please provide a valid YouTube video URL.');
    }
}

function transformYouTubeUrl(url) {
    let videoId = extractVideoId(url);
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return null; 
}

function extractVideoId(url) {
    let videoId = null;
    
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:.+)?$/;
    const match = url.match(youtubeRegex);
    if (match) {
        videoId = match[1];
    }
    return videoId;
}

 
 $(document).ready(function() {
    
    
    function renderSongs(songs, artistId) {
        let songList = '';
        songs.forEach(function(song, index) {
            songList += `
                <li class="mb-3 text-light">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="text-light">
                           ${song.song_title}
                        </div>
                        <div>
                            <a href="/download/${language}_artists/${artistId}/${index}" class="btn btn-sm btn-primary bg-dark" style="width: 100px;">Download</a>
                        </div>
                    </div>
                </li>
            `;
        });
        return songList;
    }
    
    let numToShow = 3;
let language = 'english';
const $artistContainer = $('#artistContainer');
const $hindiArtistsContainer = $('#hindi-artists-container');
const $showMoreBtn = $('#showMoreBtn');
    
    function renderArtists(artists) {
        $artistContainer.empty();
        $hindiArtistsContainer.empty();
    
        artists.slice(0, numToShow).forEach(function(artist) {
            const artistCard = `
                <div class="col-md-4 mb-4 ${language}-artist">
                    <div class="artist-card text-center">
                        <img src="${artist.artist_thumbnail}" class="img-fluid rounded-circle artist-thumbnail singer_image" alt="${artist.artist_title}" style="width: 200px; height: 200px;">
                        <h3 class="text-light">${artist.artist_title}</h3>
                        <button class="btn text-light show-songs-btn">Show Songs</button>
                        <ul class="song-list" style="display: none;">
                            ${renderSongs(artist.songs, artist._id)}
                        </ul>
                    </div>
                </div>
            `;
            const $artistCard = $(artistCard);
    
            // Attach click event handler to show/hide song list
            $artistCard.find('.show-songs-btn').on('click', function() {
                const $songList = $artistCard.find('.song-list');
                $songList.toggle(); // Toggle visibility of song list
            });
    
            if (language === 'english') {
                $artistContainer.append($artistCard);
            } else {
                $hindiArtistsContainer.append($artistCard);
            }
        });
    
        // Update 'Show More' button text based on the number of artists displayed
        if (artists.length > numToShow) {
            $showMoreBtn.text('Show More');
        } else {
            $showMoreBtn.text('Show Less');
        }
    }
    
    // Function to load artists based on the specified language
    function loadArtists(language) {
        $.ajax({
            url: `http://localhost:4000/api/${language}_artists`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjRiNmMzYTlkYzU4OGFhZmMxYjA3NzEiLCJuYW1lIjoibWFyaWFtIiwiZW1haWwiOiJtYXJpYW1AZ21haWwuY29tIiwiaWF0IjoxNzE2MjM3MjI5fQ.yBoj1RsgsbCqEavX8a2ZMwgJutqg9jBF5kZtWI1EdtA' ,
            },
            success: function(data) {
                renderArtists(data);
            },
            error: function(err) {
                console.error(`Error loading ${language} artists:`, err);
            }
        });
    }
    
    // Load initial artists on page load (English by default)
    loadArtists(language);
    
    // Event handler for 'Show More' or 'Show Less' button click
    $showMoreBtn.on('click', function() {
        if ($showMoreBtn.text() === 'Show More') {
            numToShow += 3; // Increase number of artists to show
        } else {
            numToShow = 3; // Reset to initial number of artists to show
        }
    
        // Reload artists with updated number to show
        loadArtists(language);
    });
    
    // Event handler for switching between English and Hindi artists
    $('.switch-language').click(function() {
        const newLanguage = $(this).data('language');
        if (newLanguage !== language) {
            language = newLanguage;
    
            // Toggle display of artist containers based on selected language
            if (language === 'english') {
                $artistContainer.show();
                $hindiArtistsContainer.hide();
            } else {
                $artistContainer.hide();
                $hindiArtistsContainer.show();
            }
    
            // Load artists of the selected language
            loadArtists(language);
        }
    });
    
    $('#searchForm').submit(function(event) {
        event.preventDefault(); 

        const query = $('#searchInput').val().trim();
        const searchResultsUrl = `/search-results?query=${encodeURIComponent(query)}`;

       
        window.open(searchResultsUrl, '_blank');
    });

    
    $('.searchIcon').click(function() {
        $('.form-inline').slideToggle();
    });

   

   
    
   
   
});


