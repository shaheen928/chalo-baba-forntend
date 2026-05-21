import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
const Rating = ({value,text,color='#f8e825'}) =>{
  return<>
  <div className="flex items-center gap-1 rating">
    {[1,2,3,4,5].map((index) => (
      <span key={index}>
        {value >= index ?(<FaStar style={{color}} />) : value >= index - 0.5 ? (<FaStarHalfAlt style={{color}} />) : (<FaRegStar style={{color}} />)}
      </span>
      
    ))}
    <span className="rating-text">{text && text} </span>



     

  </div>
  
  
  </>
}
export default Rating;