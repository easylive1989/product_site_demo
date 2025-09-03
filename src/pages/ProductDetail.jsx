import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>商品不存在</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          返回商品列表
        </button>
      </div>
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/')} className="back-btn">
        ← 返回商品列表
      </button>
      
      <div className="product-detail-content">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        
        <div className="product-info-section">
          <div className="product-category-badge">{product.category}</div>
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="rating-score">{product.rating}</span>
            <span className="review-count">({product.reviews} 則評價)</span>
          </div>
          
          <div className="product-pricing">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
                <span className="discount-badge">
                  省 {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>
          
          <div className="product-description">
            <h3>商品描述</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-features">
            <h3>商品特色</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="product-stock">
            <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `庫存 ${product.stock} 件` : '缺貨中'}
            </span>
          </div>
          
          {product.stock > 0 && (
            <div className="purchase-section">
              <div className="quantity-selector">
                <label>數量：</label>
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="add-to-cart-btn-large"
              >
                加入購物車 - {formatPrice(product.price * quantity)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail