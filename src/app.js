import express from 'express'
import music from './db/music.json' assert {type: 'json' }

const app = express();

const port = 6969;

app.get('/', (req, res) => {
    res.json(music)
})


//Dynamic Route
app.get('/genre/:genre', (req, res) => {
    const newSongs = music.songs.map(item => {
        item.genre.forEach(genres => {
            if(genres == req.params.genre){
                return item
            }
        })
    })

    res.send(newSongs)
})


//Adding new Song (EDIT): NEVERMIND LMAO
//app.get('/post-song', (req, res) => {
//    
//})


//Deleting Song from the route itself
app.delete('/delete-song/:id', (req, res) => {
    let newSongs;
    music.songs.forEach((item, index) => {
        if(item.id === parseInt(req.params.id)){
           newSongs = music.songs.splice(index, 1)
        }
    })

    res.json(newSongs)
})


/*
Problem:
    The Object being used throughout the code is just local to the code itself, meaning the json file was 
    just being fetched and not really being updated
*/
app.put('/edit-song/:id/:name.:author.:genre', (req, res) => {
    const genre = req.params.genre.split(',')

    const updatedSong = {
        id: parseInt(req.params.id),
        name: req.params.name,
        genre: genre,
        author: req.params.author
    }

    music.songs.forEach((items, index) => {
        if(items.id === parseInt(req.params.id)){
            music.songs[index] = updatedSong
        }
    })

    res.json(music)


})


app.listen(port, () => {
    console.log(`API Launched and now listening at Port ${port}`)
})
