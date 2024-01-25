$("#search-button").on("click", function () {
  //   console.log($("#search-input").val());
  $("#anime-list").html("");
  $.ajax({
    type: "get",
    url: "https://api.jikan.moe/v4/anime",
    data: {
      q: $("#search-input").val(),
    },
    dataType: "json",
    success: function (result) {
      $.each(result.data, function (index, value) {
        $("#anime-list").append(
          `
          <div class="col-4">
        <div class="card mb-3" style="width: 18rem;">
        <img src="` +
            value.images.jpg.image_url +
            `" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">` +
            value.title +
            `</h5>
                  <a href="` +
            value.url +
            `" class="btn btn-primary">See Details</a>
        </div>
      </div>
      </div>
        `
        );
      });
    },
  });
});
