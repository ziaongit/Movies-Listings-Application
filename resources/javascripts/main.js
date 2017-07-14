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
            output +=       '<a onclick="movieSelected('+movie.id+')" class="btn btn-primary" href="#">Movie Details</a>';
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

// -----------------------------------------------------------------------
    function movieSelected(id)
    {
        sessionStorage.setItem('movieId', id);
        window.location = 'movie.html';
        return false;
    }
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
    function getMovie() {
        var movieId = sessionStorage.getItem('movieId');
            // Make a request to the ID
            //https://api.themoviedb.org/3/movie/343611?api_key={api_key}
            //https://api.themoviedb.org/3/movie/'+movieId+'?api_key=fa155f635119344d33fcb84fb807649b
        axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=fa155f635119344d33fcb84fb807649b')
        .then(function (response) {
            var movieDetail = response.data;
            console.log(movieDetail);
            var output = '\
                <div class="row">\
                    <div class="col-md-4">\
                        <img onerror="handleMissingImg(this);" src="http://image.tmdb.org/t/p/w185/'+movieDetail.poster_path+'"> \
                    </div>\
                    <div class="col-md-8">\
                        <h2>'+movieDetail.title+'</h2>\
                        <p><strong>Overview: </strong>'+movieDetail.overview+'</p>\
                        <ul class="list-group">\
                            <li class="list-group-item"><strong>Release Date: </strong>'+movieDetail.release_date+'</li>\
                            <li class="list-group-item"><strong>Popularity: </strong>'+movieDetail.popularity+'</li>\
                            <li class="list-group-item"><strong>Vote Average: </strong>'+movieDetail.vote_average+'</li>\
                        </ul>\
                    </div>\
                    <div class ="col-md-8">\
                        <a href="index.html" class="btn btn-primary">Go Back To Search</a>\
                        <a target="_blank" href="https://www.themoviedb.org/movie/'+movieDetail.id+'-'+movieDetail.title+'" class="btn btn-primary pull-right">Read More</a>\
                    </div>\
                </div>\
                ';
            $('#movieDetail').html(output);

        })
        .catch(function (error) {
            console.log(error);
            console.log('something is going wrong');
        });
        
    }
// -----------------------------------------------------------------------