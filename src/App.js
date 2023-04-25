import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import NewMovieForm from './components/NewMovieForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';

import './App.css';


const App = () => {
  const [movies, setMovies] = useState(
    [
    {
      id: 1,
      title: 'Sully',
      posterURL: 'https://th.bing.com/th/id/R.6326baa53cc45e7e311c6fe15e9deae6?rik=MCT1n7BEMf3W3g&riu=http%3a%2f%2fwww.blackfilm.com%2fread%2fwp-content%2fuploads%2f2016%2f06%2fSully-poster.jpg&ehk=gQlcm09mHM89ZgxyfezZ9p77%2bG5Z%2fnN69wUVV4KwI0w%3d&risl=&pid=ImgRaw&r=0',
      rating: 7.4,
      status: 'Released',
      description : 'When pilot Chesley "Sully" Sullenberger lands his damaged plane on the Hudson River in order to save the flights passengers and crew, some consider him a hero while others think he was reckless',
      trailerLink: 'https://www.youtube.com/embed/mjKEXxO2KNE'
    },
    {
      id: 2,
      title: 'Captain Phillips',
      posterURL: 'https://www.newdvdreleasedates.com/images/posters/large/captain-phillips-2013-05.jpg',
      rating: 7.5,
      status: 'Released',
      description : 'The true story of Captain Richard Phillips and the 2009 hijacking by Somali pirates of the U.S.-flagged MV Maersk Alabama, the first American cargo ship to be hijacked in two hundred years.',
      trailerLink: 'https://www.youtube.com/embed/GEyM01dAxp8'
    },
    {
      id: 3,
      title: '12 Years a Slave',
      posterURL: 'https://th.bing.com/th/id/R.45cd1b5d8df35c46ab7620ff3e94fc7f?rik=jvDZ1bDEI1yH8Q&riu=http%3a%2f%2fupressonline.com%2fwp-content%2fuploads%2f12-Years-a-Slave-Enhanced.jpg&ehk=QQQ8IDkNQeN8O5apSfIsunLBtpqftb79oI%2fckVyvXb8%3d&risl=&pid=ImgRaw&r=0',
      rating: 8.1,
      status: 'Released',
      description : 'In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery ',
      trailerLink: 'https://www.youtube.com/embed/z02Ie8wKKRg'
    }
  ]
  );
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies) {
      setMovies(storedMovies);
    }else {
      setMovies([]);
    }
  }, []);


  
  const handleAddMovie = (movie) => {
    // Create a new movie object with a unique ID
    const newMovie = { ...movie, id: movies.length + 1, trailerLink: movie.trailerLink };
    setMovies(prevMovies => {
      const updatedMovies = [...prevMovies, newMovie];
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };
  
  

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);
  

  return (
    <Router>
    <div className="app">
      <h1>Movie App</h1>
      <div className="center_position">
        <Filter
          onFilter={({ title, rating }) => {
            setTitleFilter(title);
            setRatingFilter(rating);
          }}
        />
      
      </div>
      <Routes>
        <Route exact path="/" element={
          <MovieList
            movies={movies.filter((movie) => {
              return (
                movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
                movie.rating >= ratingFilter
              );
            })}
          />
        } />
        <Route path="/movies/:id" element={<MovieDetails movies={movies} />} />
      </Routes>
      <NewMovieForm onAddMovie={handleAddMovie} />
    </div>
  </Router>
  );
};

export default App;