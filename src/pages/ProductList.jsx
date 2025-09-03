import { useState } from 'react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import './ProductList.css'

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部商品')
  const [sortBy, setSortBy] = useState('default')

  const filteredProducts = products.filter(product => 
    selectedCategory === '全部商品' || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="product-list-page">
      <div className="filters">
        <div className="filter-group">
          <label>商品分類：</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>排序方式：</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">預設排序</option>
            <option value="price-low">價格由低到高</option>
            <option value="price-high">價格由高到低</option>
            <option value="name">名稱排序</option>
            <option value="rating">評分排序</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="no-products">
          <p>此分類下暫無商品</p>
        </div>
      )}
    </div>
  )
}

export default ProductList