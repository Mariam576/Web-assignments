// Function to fetch and display stories
function displayStories() {
  $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
      dataType: "json",
      success: function (data) {
          var List = $("#List");
          List.empty();

          $.each(data, function (index, story) {
              List.append(
                  `<div class="mb-3">
                      <h3 class="text-light">${story.title}</h3>
                      <div class="text-light">${story.body}</div>
                      <div>
                          <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${story.id}">Edit</button>
                          <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${story.id}">Delete</button>
                      </div>
                  </div>
                  <hr />`
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
      url: "https://jsonplaceholder.typicode.com/posts/" + Id,
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
          url: "https://jsonplaceholder.typicode.com/posts/" + Id,
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
          url: "https://jsonplaceholder.typicode.com/posts",
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
      url: "https://jsonplaceholder.typicode.com/posts/" + storyId,
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

  // Function to refresh the list of stories
  function refreshStories() {
      displayStories();
  }

  // Attach a click event listener to the refresh button
  $(document).on("click", "#refreshBtn", refreshStories);
});
