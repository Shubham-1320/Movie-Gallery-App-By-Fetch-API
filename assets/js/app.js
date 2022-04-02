var  cl = console.log;

//Note- we get moviedb URL from themoviedb.org, we fetch movie data and display  as a movie gallery.
// we need  need 3 pieces of data baseurl + discover/search + genrated key
//Ex >>
// let API= `https://api.themoviedb.org/3/(discover URL)&api_key=f5ff46980574770fdf353a1897c947c1`

//------------------------------------------------------------------------------------


const API_URL=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&
api_key=f5ff46980574770fdf353a1897c947c1&page=1`
let SEARCH_API =`https://api.themoviedb.org/3/search/movie?
api_key=f5ff46980574770fdf353a1897c947c1&query="`
const IMG_PATH = `https://image.tmdb.org/t/p/w400`

let form = document.getElementById('form');
let search = document.getElementById('search');
let main = document.getElementById('main');

// 1 GET movies from Server by fetch by using promise

        //fetch by using promise

        // fetch(API_URL,{
        //     method:`GET`,
        //     headers:{
        //         'content-type':'application/json; charset= UTF-8'
        //         }
        //     }).then(res=>res.json())
        //     .then(data=>cl(data.results))

        //OR

        //fetch by using async await

        async function getMovies(url){
            let res = await fetch(url)
            let data = await res.json()
            cl(data.results)
            templating (data.results)
        }
        getMovies(API_URL)

        // get search movie
        
        function getSearchMovie(ele){
            ele.preventDefault();
            let searchTerm = search.value;
            // cl(searchTerm)

            if(searchTerm && searchTerm!==''){
                getMovies(SEARCH_API + searchTerm )
                form.reset()
                // search.value=''
            }else{
                window.location.reload()
            }
        }

// 2 templating function

function templating (arr){
    result = ''
    arr.forEach((mov)=>{
        const{poster_path,title,vote_average,overview,} = mov
        result+=`<div class="movie m-4">
                    <img src="${IMG_PATH + poster_path}" class="img-fluid">
                 <div class="movie-info mt-1">
                    <h3 class="ml-2"> ${title}</h3>
                    <span class="${getClassByVote(vote_average)} mr-2 p-1">${vote_average}</span>
                </div>
                <div class="overview p-2">
                    <h3>overview</h3>
                    ${overview}
                </div>
            </div> `
    })

    main.innerHTML = result
}

function getClassByVote(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}


// event 
form.addEventListener('submit', getSearchMovie);