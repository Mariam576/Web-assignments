
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
       // Function to append songs to the container
       function appendSongs(songs, start, end) {
        for (let i = start; i < end; i++) {
            const song = songs[i];
            var songCard = `
                <div class="col-md-4 mb-4 col-sm-6">
                    <div class="card bg-dark-2 card-height">
                        <img src="${song.imageUrl}" class="card-img-top image-height-2" alt="Music Image">
                        <div class="card-body">
                            <h5 class="card-title">${song.name}</h5>
                            <p class="card-text">Artist: ${song.artists.join(", ")}</p>
                            <a href="/download/${i}" class="btn btn-primary bg-dark">Download Now</a>
                        </div>
                    </div>
                </div>
            `;
            $('#songs-container').append(songCard);
        }
    }

   // Fetch and display songs data
   $.get("/api/songs", function(data, status) {
    if (status === "success") {
        // Display the first 15 songs initially
        appendSongs(data, 0, 15);

        // Show More button click event
        $('#showMoreBtn2').click(function() {
            // Calculate the start and end indices for the next batch of songs
            const start = $('#songs-container').children().length;
            const end = start + 15;
            
            // Append the next batch of songs
            appendSongs(data, start, end);

            // Hide the "Show More" button if all songs are displayed
            if (end >= data.length) {
                $('#showMoreBtn2').hide();
            }

            // Show the "Show Less" button
            $('#showLess2').show();
        });

        // Show Less button click event
        $('#showLess2').click(function() {
            // Remove the last batch of songs from the container
            $('#songs-container').children().slice(-15).remove();

            // Hide the "Show Less" button if only the initial 15 songs are displayed
            if ($('#songs-container').children().length <= 15) {
                $('#showLess2').hide();
            }

           
        });

        // Initially hide the "Show Less" button
        $('#showLessBtn').hide();
    } else {
        console.log("Failed to fetch songs data");
    }
});
    
   $('.searchIcon').click(function() {
      $('.form-inline').slideToggle()
     
   });
   $("#submitBtn").on("click", handleFormSubmissions);
          // Function to append artists to the container
          function appendArtists(artists, start, end, language) {
              for (let i = start; i < end; i++) {
                  const artist = artists[i];
                  // Check if images are available for the artist
                  if (artist.images && artist.images.length > 0) {
                      // Select the first image URL
                      var imageUrl = artist.images[0].url;
                  } else {
                      // If no images are available, use a placeholder image
                      var imageUrl = "placeholder.jpg"; // Provide a path to your placeholder image
                  }

                  var artistCard = `
                      <div class="col-md-4 mb-4 ${language}-artist">
                          <div class="artist-card text-center">
                              <img src="${imageUrl}" class="img-fluid rounded-circle" alt="${artist.name}" style="width: 200px; height: 200px;">
                              <h3 class="text-light">${artist.name}</h3>
                          </div>
                      </div>
                  `;
                  $('#hindi-artists-container').append(artistCard);
              }
          }

          // Fetch and display Hindi artist data
          $.get("/api/artists", function(data, status) {
              if (status === "success") {
                  // Display the first 6 artists initially
                  appendArtists(data, 0, 6, 'hindi');

                  // Show More button click event
                  $('#showMoreBtn').click(function() {
                      // Show the next 6 artists
                      appendArtists(data, $('#hindi-artists-container').children().length, $('#hindi-artists-container').children().length + 6, 'hindi');

                      // Hide the "Show More" button if all artists are displayed
                      if ($('#hindi-artists-container').children().length >= data.length) {
                          $('#showMoreBtn').hide();
                      }
                  });
              } else {
                  console.log("Failed to fetch Hindi artist data");
              }
          });

          var language = 'english'; // Default language
          $('#hindi-artists-container').hide();
          $('.switch-language').click(function() {
              language = $(this).data('language');
              if (language === 'english') {
                  $('.english-artist').show();
                  $('#hindi-artists-container').hide();
              } else {
                  $('.english-artist').hide();
                  $('#hindi-artists-container').show();
              }
          });
      });


 

