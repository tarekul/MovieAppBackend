const {getDbConnect} = require('./dbConnect')
const {dbAddr} = require('../config')
const movieService = {}

movieService.create = (title, genre_id, img_url) => {
    const sql = `
    INSERT INTO movies(title, genre_id, img_url)
    VALUES ($[title], $[genre_id], $[img_url])
    RETURNING id`;
    return getDbConnect(dbAddr).one(sql, {title, genre_id, img_url})
  }
  
  movieService.read = (id) => {
    const sql = `
    SELECT *
    FROM movies
    WHERE id=$[id]`
    return getDbConnect(dbAddr).one(sql, {id})
  }

  movieService.readEverything = (id) => {
    const sql = `
    SELECT movies.*, genres.genre AS genre_name
        FROM
            (SELECT movies.*, AVG(ratings.stars) AS avg_rating
            FROM movies
            LEFT JOIN ratings
            ON ratings.movie_id = movies.id
            GROUP BY movies.id) AS movies
        LEFT JOIN genres
        ON movies.genre_id = genres.id
        WHERE movies.id = $[id];
    ` 
    return getDbConnect(dbAddr).oneOrNone(sql, {id})
  }

  movieService.getcomments = (id) => getDbConnect(dbAddr).any('SELECT * FROM comments WHERE movie_id=$[id]',{id})
   

  movieService.readAll = () => {
    const sql = `
    SELECT *
    FROM movies`
    return getDbConnect(dbAddr).any(sql)
  }

  movieService.readMovieGenre = (id) =>{
    const sql = `
    SELECT movies.*, genres.genre
        FROM
            movies
        LEFT JOIN genres
        ON movies.genre_id = genres.id
        WHERE genres.id = $[id];
    ` 
    return getDbConnect(dbAddr).any(sql, {id})
  }
  
  movieService.update = (id, title, genre_id, img_url) => {
    const sql = `
    UPDATE movies
    SET 
    id=$[id],
    title=$[title],
    genre_id=$[genre_id],
    img_url=$[img_url]
    WHERE id =$[id]`
    return getDbConnect(dbAddr).none(sql, {title, genre_id, img_url})
  }
  
  movieService.delete = (id) => {
    const sql = `
    DELETE movies
    WHERE id=$[id]`
    return getDbConnect(dbAddr).none(sql, {id})
  }
  
  
  module.exports = movieService;
  
  
  
  