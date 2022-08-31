import './App.css';
import { useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/images/Bulbizar.png" },
  { "src": "/images/carapuce.png" },
  { "src": "/images/Metamorph.png" },
  { "src": "/images/Pikachu.jpg" },
  { "src": "/images/Ptitard.png" },
  { "src": "/images/Salameche.jpg" },
  //{ "src": "/images/Dos_carte_pokemon.jpg" },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffleCards)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Memory</h1>
      <button onClick={shuffleCards}>Nouvelle partie</button>

      <div className='card-grid'>
        {cards.map(card =>(
          <SingleCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
