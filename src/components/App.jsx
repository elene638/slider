import React from 'react'
import Data from './data'
import {FiChevronRight, FiChevronLeft} from "react-icons/fi"
import {FaQuoteRight} from "react-icons/fa"

function App() {

  const [index, setIndex] = React.useState(0)
  const [people, setPeople] = React.useState(Data)

  React.useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
  }, [index, people])

  React.useEffect (() => {
    let slide = setInterval(() => {
        setIndex(index + 1)
      }, 3000)
      return () => clearInterval(slide) 
  }, [index])

  return (
    <div>
      <div className='header'>
        <h1><span>/ </span>Reviews</h1>
      </div>
      <div className='main'>
        {people.map((person, personIndex) => {
          const {id, image, name, title, quote} = person;
          
          let position = 'nextSlide';
          if(personIndex === index) {
            position = 'activeSlide'
          }
          if (personIndex === index - 1  || (index === 0 && personIndex === people.length - 1)) {
            position = 'lastSlide'
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className='img' />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon'/>
            </article>
          );
        })}
        <button onClick={() => setIndex(index - 1)} className='left'>
          <FiChevronLeft />
        </button>
        <button onClick={() => setIndex(index + 1)} className='right'>
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
}

export default App