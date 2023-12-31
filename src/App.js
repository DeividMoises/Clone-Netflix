import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb2 from './Tmdb2';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Car from "./components/img/carregando.gif";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuaredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista Total
      let list = await Tmdb2.getHomeList();
      setMovieList(list);

      // pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb2.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect (()=> {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuaredData &&
        <FeaturedMovie item={featuaredData} />
      }
      
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key}  title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label= "Coração">♥ pelo</span> < a href="https://www.linkedin.com/in/deivid-tecnologia/" target="_blank"> Deivid Moises</a><br/>
        Direitos de imagem para Netflix<br/>
        Dados pego do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && 
      <div className="loading">
        <img src={Car} alt="Carregando"></img>
      </div>
      }
    </div>
  );
}
