const config = require('config');
const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const Joi = require('joi');
const  app = express();
const logger =require('./logger');
 app.use(express.json());
app.use(logger);

const movies = [
    {id: 1, movie: 'Ax', genre: "roman"},
    {id: 2, movie: 'ARYx', genre: "romance"},
    {id: 3, movie: 'AGHx', genre: "romance"},
    {id: 4, movie: 'AGx', genre: "romance"},
    {id: 5, movie: 'AxGDG', genre: "Action"},

];

//configuration
console.log(`Applicarion name: ${config.get('name')}`);

app.get('/api/genres', (req, res) => {
    res.send(movies);
});
app.get('/api/genres/:id', (req, res) => {
    let movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return  res.status(404).send('Page not found');
    res.send(movie);
});

app.post('/api/genres', (req, res) => {
    const Schema = {
        genre: Joi.string().min(3).max(10).required()
    };
    const  result = Joi.validate(req.genre, Schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const  movie = {
        id: movies.length + 1,
        name: req.body.genre,
    };
    movies.push(movie);
    res.send(movie);
});



app.put('/api/genre/:id', (req, res) => {
    let movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return  res.status(404).send('Page not found');
    //res.send(course);

    const Schema = {
        genre: Joi.string().min(3).max(10).required()
    };

    const result = Joi.validate(req.genre, Schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        // return;
    }
    movie.genre = req.body.genre;
    res.send(genre);


});



app.delete('/api/genres/:id', (req, res) => {
    let movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return  res.status(404).send('Page not found');
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);

});

if (app.get('env') === 'development') {
    startUpDebugger('this is a debug...');


}

dbDebugger('connected to db');
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port} `));