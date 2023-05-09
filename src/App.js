import { useState, useEffect } from 'react';
import { Card } from './components/Card';
import './App.css';

import { images } from './imagesImport';

function App() {

  const [playing, setPlaying] = useState(false);
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});

  const [unflippedCards, setUnflippedCards] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  useEffect(() => {
    shuffleArray(images);
    setCards(images);
  }, []);

  useEffect(() => {
    checkMatch();
  }, [secondCard]);
  
  const flipCard = (name, number) => {
    if (firstCard.name === name && firstCard.number === number) {
      return 0;
    }
    if (!firstCard.name) {
      setFirstCard({ name, number });
    }
    else if (!secondCard.name) {
      setSecondCard({ name, number });
    }
    return 1;
  }

  const checkMatch = () => {
    if (firstCard.name && secondCard.name) {
      const match = firstCard.name === secondCard.name;
      match ? disableCards() : unflipCards();
    }
  }

  const disableCards = () => {
    setDisabledCards([firstCard.number, secondCard.number]);
    resetCards();
  };

  const unflipCards = () => {
    setUnflippedCards([firstCard.number, secondCard.number]);
    resetCards();
  };

  const resetCards = () => {
    setFirstCard({});
    setSecondCard({});
  }

  const startGame = () => {
    setPlaying(true);
    setDisabledCards([]);
  }

  const reiniciarJuego = () => {
    setPlaying(false);
    setDisabledCards([]);
    shuffleArray(images);
    setCards(images);
  }

  return (
    <section className='bodyApp'>
      <button className='btn-beginGame' onClick={ () => {startGame()} }>Comenzar Juego</button>
      { playing
        ?
        <div className='app'>
          <button onClick={ () => {reiniciarJuego()}}>Reiniciar Juego</button>
          <div className='cards-container'>
            {
              cards.map((card, index) => (
                <Card
                  name={card.player}
                  number={index}
                  frontFace={card.src}
                  flipCard={flipCard}
                  unflippedCards={unflippedCards}
                  disabledCards={disabledCards}
                />
              ))
            }
          </div>
        </div>
        :
        ""
      }
    </section>
  );
}

export default App;
