const express = require('express')
const movieRoute = express.Router()

const movieService = require('../services/movies')

movieRoute.get('/',(req,res)=>{
    movieService.readAll()
    .then(response=>res.json(response))
})

movieRoute.get('/:id',(req,res)=>{
    const {id} = req.params
    const p1 = movieService.readEverything(id)
    const p2 = movieService.getcomments(id)

    Promise.all([p1,p2])
    .then(([movie,comments])=>{
        movie.comments = comments;
        res.json(movie)
     
        
    })
    .catch(err=>{
        res.json({Error: err})
    })
    
})

movieRoute.get('/:genre_id/genre',(req,res)=>{
    const {genre_id} = req.params
    movieService.readMovieGenre(genre_id)
    .then(response=>res.json(response))
    .catch(error=>res.json(error))
})

module.exports = {movieRoute}

