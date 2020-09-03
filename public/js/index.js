$("#submit-form").on("click", async (e) => {
  e.preventDefault($("#login-form-text").text());
  const username = $("#login-form-text").val().trim();

  // Add Retrieving Info Screen
  $("#submit-form").text("")
    .append(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Retrieving User Info...`);

  // Check if user exists
  const getCollectionUrl = `${API_URL}/collections/${username}`;
  let data = await axios.get(getCollectionUrl, { validateStatus: false });
  let status = data.status;

  // If user exists, proceed
  if (status == 200 || status == 201) {
    $(".invalid-feedback").remove();
    $("#login-form-text").removeClass("is-invalid");
    $("#login-form-text").addClass("is-valid");

    // Add Timer for Unresponsive Page
    await setTimeout((_) => {
      $("form")
        .append(`<div class="slide-top alert alert-warning alert-dismissible fade show mt-3" role="alert">
      <strong>Still waiting?</strong> The server might be overloaded, try refreshig the page and submiting again.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`);
    }, 45000);
    $(".alert-warning").css("border-width", "0px");
    // Add Loading Screen
    $("#submit-form").text("")
      .append(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Processing Collection...`);

    // Enrich collection
    const response = await axios.get(
      `${API_URL}/collections/${username}/enrich`
    );
    response.status == 200
      ? undefined
      : await axios.post(`${API_URL}/collections/${username}/enrich`);

    // Periodically check if collection was enriched
    const intervalID = setInterval(async function () {
      response = await axios.get(`${API_URL}/collections/${username}/enrich`);
      if (response.status == 200) {
        await clearInterval(intervalID);
        const collection = response.data;
        const compressedCollection = LZUTF8.compress(
          JSON.stringify(collection),
          {
            outputEncoding: "StorageBinaryString",
          }
        );

        $(".spinner-border").remove();
        $("#submit-form")
          .text("All Done!")
          .css("background-color", LIGHT_COLOR);
        window.localStorage.clear();
        window.localStorage.setItem("collection", compressedCollection);

        await setTimeout((_) => {
          window.open(`${API_URL}/main`, "_self");
        }, 700);
      }
    }, 5000);
  } else if (username == "") {
    // Reset Submit Button Text
    $("#submit-form").empty().text("Let's Start!");
    $("#login-form-text").addClass("is-invalid");
    $(".invalid-feedback").remove();
    const feedbackDiv = `<div class="invalid-feedback">Please enter a username.</div>`;
    $(feedbackDiv).insertAfter($("#login-form-text"));
  } else {
    // Reset Submit Button Text
    $("#submit-form").empty().text("Let's Start!");
    $("#login-form-text").addClass("is-invalid");
    $(".invalid-feedback").remove();
    const feedbackDiv = `<div class="invalid-feedback">Username <em>${username}</em> could not be found.</div>`;
    $(feedbackDiv).insertAfter($("#login-form-text"));
  }
});
