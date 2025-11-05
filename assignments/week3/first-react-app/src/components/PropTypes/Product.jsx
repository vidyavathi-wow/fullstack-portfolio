import PropTypes from "prop-types"


const Product = ({title:Title,price}) => {
  return (
    <div>
      <h1>{Title}</h1>
      <h1>{price}</h1>
    </div>
  )
  
}

Product.propTypes={
    title:PropTypes.string.isRequired,
    price:PropTypes.number,
}


export default Product