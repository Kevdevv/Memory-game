import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/images/Bulbizar.png", matched: false },
  { "src": "/images/carapuce.png", matched: false },
  { "src": "/images/Metamorph.png", matched: false },
  { "src": "/images/Pikachu.jpg", matched: false },
  { "src": "/images/Ptitard.png", matched: false },
  { "src": "/images/Salameche.jpg", matched: false },
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
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
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
           flipped={card === choiceOne || card === choicetwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
