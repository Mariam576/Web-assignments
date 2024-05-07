
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
function handleFormSubmissions(event) {
   console.log("inside handleFormSubmission");

   let firstName = $("#firstName").val();
   let lastName = $("#lastName").val();
   let email = $("#email").val();
   let message = $("#message").val();
   let errorFlag = false;

   
   $(".form-control").removeClass("error");

   if (!firstName) {
     $("#firstName").addClass("error");
     errorFlag = true;
   }

   if (!lastName) {
     $("#lastName").addClass("error");
     errorFlag = true;
   }

   if (!email) {
     $("#email").addClass("error");
     errorFlag = true;
   }

   if (!message) {
     $("#message").addClass("error");
     errorFlag = true;
   }

   if (errorFlag) {
     console.log("Form has errors");
     event.preventDefault();
   } else {
     console.log("Form is valid");
   }
 }

 
 $(document).ready(function() {
   
    
   
    $('#searchForm').submit(function(event) {
        event.preventDefault(); 

        const query = $('#searchInput').val().trim();
        const searchResultsUrl = `/search-results?query=${encodeURIComponent(query)}`;

       
        window.open(searchResultsUrl, '_blank');
    });

    
    $('.searchIcon').click(function() {
        $('.form-inline').slideToggle();
    });

    // Handle form submissions on button click
    $('#submitBtn').click(function() {
        handleFormSubmissions();
    });

    // Function to append artists to the container
    function appendArtists(artists, start, end, language) {
        for (let i = start; i < end && i < artists.length; i++) {
            const artist = artists[i];
            const imageUrl = artist.images && artist.images.length > 0 ? artist.images[0].url : 'placeholder.jpg';

            const artistCard = `
                <div class="col-md-4 mb-4 ${language}-artist">
                    <div class="artist-card text-center">
                        <img src="${imageUrl}" class="img-fluid rounded-circle" alt="${artist.name}" style="width: 200px; height: 200px;">
                        <h3 class="text-light">${artist.name}</h3>
                    </div>
                </div>
            `;

            $(`#${language}-artists-container`).append(artistCard);
        }
    }

    // Fetch and display artist data
    $.get('/api/artists', function(data, status) {
        if (status === 'success') {
            // Display the first 6 artists initially
            appendArtists(data, 0, 6, 'hindi');

            // Show More button click event
            $('#showMoreBtn').click(function() {
                const container = $('#hindi-artists-container');
                const numDisplayed = container.children().length;
                const numToShow = 6;

                appendArtists(data, numDisplayed, numDisplayed + numToShow, 'hindi');

                // Hide the "Show More" button if all artists are displayed
                if (container.children().length >= data.length) {
                    $('#showMoreBtn').hide();
                }
            });
        } else {
            console.log('Failed to fetch artist data');
        }
    });

    // Switch language between English and Hindi artists
    let language = 'english'; // Default language
    $('#hindi-artists-container').hide();

    $('.switch-language').click(function() {
        language = $(this).data('language');
        if (language === 'english') {
            $('.english-artist').show();
            $(`#${language}-artists-container`).hide();
        } else {
            $('.english-artist').hide();
            $(`#${language}-artists-container`).show();
        }
    });

   
});


