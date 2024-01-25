function searchMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "a74cee1b",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
              <div class="col-md-4">
              <div class="card mb-3" style="width: 18rem;">
              <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">` +
              data.Title +
              `</h5>
                <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Detail</a>
              </div>
            </div>
            </div>
              `
          );
        });
        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          `
          <div class="col">
           <h1 class='text-center'>` +
            result.Error +
            `</h1>
          </div>
          `
        );
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "http://www.omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "a74cee1b",
      i: $(this).data("id"),
    },
    success: function (result) {
      if (result.Response == "True") {
        $("#modal-body").html(
          `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <img src="` +
            result.Poster +
            `" class="img-fluid">
                </div>        
                <div class="col-md-8">
                    <ul class="list-group">
                        <li class="list-group-item"><h3>` +
            result.Title +
            `</h3></li>
                        <li class="list-group-item">Released: ` +
            result.Released +
            `</li>
                        <li class="list-group-item">Genre: ` +
            result.Genre +
            `</li>
                        <li class="list-group-item">Director: ` +
            result.Director +
            `</li>
                        <li class="list-group-item">Actors: ` +
            result.Actors +
            `</li>
                    </ul>
                </div>        
            </div>
        </div>
        `
        );
      }
    },
  });
});
