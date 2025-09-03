import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartItemsCount 
  } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-content">
          <h2>購物車是空的</h2>
          <p>看起來您還沒有添加任何商品到購物車中</p>
          <Link to="/" className="continue-shopping-btn">
            開始購物
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>購物車 ({getCartItemsCount()} 件商品)</h1>
        <button onClick={clearCart} className="clear-cart-btn">
          清空購物車
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-info">
                <Link to={`/product/${item.id}`} className="item-name">
                  {item.name}
                </Link>
                <div className="item-category">{item.category}</div>
                <div className="item-price">{formatPrice(item.price)}</div>
              </div>
              
              <div className="item-quantity">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                {formatPrice(item.price * item.quantity)}
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                移除
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="summary-content">
            <h3>訂單摘要</h3>
            
            <div className="summary-row">
              <span>商品總計</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            
            <div className="summary-row">
              <span>運費</span>
              <span>免運費</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>總計</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            
            <button className="checkout-btn">
              前往結帳
            </button>
            
            <Link to="/" className="continue-shopping-link">
              繼續購物
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart