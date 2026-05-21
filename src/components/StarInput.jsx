import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StartInput = ({rating,setRating}) => {
  const [hover,setHover] = useState(0)
  return(
    <div style={{display: 'flex',flexDirection: 'row',gap: '5px'}}>
      {[1,2,3,4,5].map((index) => {
        return (
          <button type="button" key={index}
          onClick={() => setRating(index) }
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(0)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            fontSize: '1.8rem',
            padding: '0'
          }}><FaStar style={{
            color: index <= (hover || rating) ? '#f8e825' : '#e4e5e9',
            transition: 'color 200ms',
          }} /></button>
        )
      })}
    </div>
  )
}

export default StartInput;