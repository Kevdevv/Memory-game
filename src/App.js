import './App.css';
import { useEffect, useState } from 'react';
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
  const [choiceOne, setChoiceOne] = useState(null)
  const [choicetwo, setchoiceTwo] = useState(null)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffleCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choicetwo) {
      if (choiceOne.src === choicetwo.src) {
        console.log('bonne réponse')
        resetTurn()
      } else {
        console.log('mauvaise réponse')
        resetTurn()
      }
    }
  }, [choiceOne, choicetwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Memory</h1>
      <button onClick={shuffleCards}>Nouvelle partie</button>

      <div className='card-grid'>
        {cards.map(card =>(
          <SingleCard
           key={card.id}
           card={card}
           handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
