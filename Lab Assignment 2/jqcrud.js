$(document).ready(function() {
            
    $('.switch-language').click(function() {
        var language = $(this).data('language');
        if (language === 'english') {
            $('.english-artist').show();
            $('.hindi-artist').hide();
        } else {
            $('.english-artist').hide();
            $('.hindi-artist').show();
        }
    })
       
    $('.searchIcon').click(function() {
       $('.form-inline').slideToggle()
      
    });
    $("#submitBtn").on("click", handleFormSubmissions);
});
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

  
function displayStories() {
    $.ajax({
        url: "https://usmanlive.com/wp-json/api/stories",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var List = $("#List");
            List.empty();

            $.each(data, function (index, story) {
                List.append(
                    `<div class="card mb-3">
                        <div class="card-body">
                            <h3 class="card-title">${story.title}</h3>
                            <p class="card-text">${story.body}</p>
                            <div>
                                <button class="btn btn-danger btn-sm mr-2 btn-edit" data-id="${story.id}">Edit</button>
                                <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${story.id}">Delete</button>
                            </div>
                        </div>
                    </div>`
                );
            });

        },
        error: function (error) {
            console.error("Error fetching data:", error);
        },
    });
}


// Function to delete a story
function deleteStory() {
  let Id = $(this).attr("data-id");
  $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + Id,
      method: "DELETE",
      success: function () {
          displayStories();
      },
      error: function (error) {
          console.error("Error deleting data:", error);
      },
  });
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  let Id = $("#createBtn").attr("data-id");
  var title = $("#createTitle").val();
  var content = $("#createContent").val();
  if (Id) {
      $.ajax({
          url: "https://usmanlive.com/wp-json/api/stories/" + Id,
          method: "PUT",
          data: { title, content },
          success: function () {
              displayStories();
          },
          error: function (error) {
              console.error("Error creating data:", error);
          },
      });
  } else {
      $.ajax({
          url: " https://usmanlive.com/wp-json/api/stories",
          method: "POST",
          data: { title, content },
          success: function () {
              displayStories();
          },
          error: function (error) {
              console.error("Error creating story:", error);
          },
      });
  }
}

// Function to handle edit button click
function editBtnClicked(event) {
  event.preventDefault();
  let storyId = $(this).attr("data-id");
  $.ajax({
      url: " https://usmanlive.com/wp-json/api/stories/" + storyId,
      method: "GET",
      success: function (data) {
          $("#clearBtn").show();
          $("#createTitle").val(data.title);
          $("#createContent").val(data.body);
          $("#createBtn").html("Update");
          $("#createBtn").attr("data-id", data.id);
      },
      error: function (error) {
          console.error("Error deleting story:", error);
      },
  });
}

$(document).ready(function () {
  // Initial display of stories
  displayStories();

  // Attach event listeners
  $(document).on("click", ".btn-del", deleteStory);
  $(document).on("click", ".btn-edit", editBtnClicked);
  $("#createForm").submit(handleFormSubmission);
  $("#clearBtn").on("click", function (e) {
      e.preventDefault();
      $("#clearBtn").hide();
      $("#createBtn").removeAttr("data-id");
      $("#createBtn").html("Create");
      $("#createTitle").val("");
      $("#createContent").val("");
  });

  
});
