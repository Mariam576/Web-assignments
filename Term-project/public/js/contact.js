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
     
    } else {
    
          
         
           event.preventDefault();
       
     
    }
  }
  $(document).ready(function() {
    // Handle form submissions on button click
    $('#submitBtn').click(function() {
        handleFormSubmissions();
    });})