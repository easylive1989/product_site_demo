import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Layout.css'

const Layout = ({ children }) => {
  const { getCartItemsCount } = useCart()

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>購物商城</h1>
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">商品列表</Link>
              <Link to="/cart" className="nav-link cart-link">
                購物車
                {getCartItemsCount() > 0 && (
                  <span className="cart-badge">{getCartItemsCount()}</span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 購物商城. 版權所有.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout