$(document).ready(function() {
    // -----------------------------------------------------------------------
    $.each($('#navbar').find('li'), function() {
        $(this).toggleClass('active', 
            window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
    }); 
    // -----------------------------------------------------------------------

    // -----------------------------------------------------------------------
        $('#searchForm').on('submit', function(e) {
            e.preventDefault();
            var searchText = $('#searchText').val();
            getMovies(searchText);
        });
    // -----------------------------------------------------------------------
});

// -----------------------------------------------------------------------
function getMovies(searchText) {
    // Make a request to the URL 
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='+searchText)
    .then(function (response) {
        var movies = response.data.results;
        var output = '';
        $.each(movies, function(index, movie){
            output += '<div class="col-md-3 movie-result">';
            output +=   '<div class="well text-center">';
            output +=           '<img onerror="handleMissingImg(this);" src="http://image.tmdb.org/t/p/w185/'+movie.poster_path+'">';
            output +=       '<h5>'+ movie.title+'</h5>';
            output +=       '<a onclick=movieSelected("'+movie.id+' class="btn btn-primary" href="#")>Movie Details</a>';
            output +=   '</div>';
            output += '</div>';
        });


        if ( movies.length > 0 ) {
            $('#movies').html(output);
        } else {
            $('#movies').html('<div class="col-md-8 col-md-offset-2 movie-result text-center"><div class="alert alert-warning" role="alert"><strong><h4>Sorry!</strong> Result for '+searchText+' not found!</h4></div></div>');
        }

    })
    .catch(function (error) {
        console.log(error);
        console.log('something is going wrong');
    });
}

// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
    function handleMissingImg(ele)
    {
        ele.src = '../../resources/images/poster-not-found.png';
    }
// -----------------------------------------------------------------------