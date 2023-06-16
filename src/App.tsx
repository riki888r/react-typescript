import React, { useState, ChangeEvent, FormEvent, ChangeEventHandler } from 'react'


interface ProductData {
  item: string,
  quantity: string,
  description: string,
  cattegory: string,
  price: string
}
interface newProductData {
  id: number,
  item: string,
  quantity: string,
  description: string,
  price: string
}

function App() {
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false)
  const [productData, setProductData] = useState<ProductData>({
    item: "",
    quantity: '',
    description: "",
    cattegory: "all",
    price: ''
  })
  const [product, setProduct] = useState<ProductData[]>([]);
  function handleChange(e: ChangeEvent) {
    const newData = { ...productData, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value, id: Date.now() }
    setProductData(newData);

  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setProduct([...product, productData]);
    console.log(product);
    setProductData({
      item: "",
      quantity: '',
      description: "",
      cattegory: '',
      price: ''
    })
    setShowForm(prev => !prev)
  }
  function handleShow() {
    setShowForm(prev => !prev)
  }
  function handleSelect(e: ChangeEvent) {

    setFilter((e.target as HTMLSelectElement).value);
    console.log(filter);
    const newData = product.filter(item => item.cattegory !== filter && item)
    setProduct(newData)
  }

  function handleDelete(id: number) {
    console.log(id);
    const newProducts = product.filter(prod => prod.id !== id)
    setProduct(newProducts)
  }

  return (
    <>

      <button className="addForm" onClick={handleShow}>Add items</button>
      {showForm && <div className="form-bx">
        <h3>Add Products</h3>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name='item' placeholder='item' onChange={handleChange} required value={productData.item} />
          <input type="number" name='quantity' placeholder='quantity' required onChange={handleChange} value={productData.quantity} />
          <textarea required id="" name='description' placeholder='description' onChange={handleChange} value={productData.description}></textarea>
          <input type="number" name='price' placeholder='price' required onChange={handleChange} value={productData.price} />
          <select name="cattegory" id="" value={productData.cattegory} onChange={handleChange}>
            <option value="">select cattegory</option>
            <option value="mobiles">mobiles</option>
            <option value="cloths">cloths</option>
            <option value="books">books</option>
          </select>
          <input type="submit" value="submit" />
        </form>
      </div>}
      {!showForm && <div className="search-box">
        <form action="">
          <input type="text" placeholder='search product' />
          <select name="" id="" value={filter} onChange={handleSelect}>
            <option value="all">All</option>
            <option value="mobiles">mobiles</option>
            <option value="cloths">cloths</option>
            <option value="books">books</option>
          </select>
        </form>

      </div>}


      <div className="show-box">
        {product.length === 0 && <h2>No items pls add some</h2>}
        <ul>
          {product.map((prod: ProductData) => (
            <li key={prod.id} >
              <h3>Name: {prod.item}</h3>
              <h4>cattegory: {prod.cattegory}</h4>
              <h5>Quantity: {prod.quantity}</h5>
              <h6>Price: {prod.price}</h6>
              <div className="action">
                <span onClick={() => handleDelete(prod.id)}>&times;</span>
              </div>
            </li>
          ))}
        </ul>
      </div>


    </>
  )
}



export default App



function DetailBox() {
  return <>
    <div className="modal-box">
      <h2>Detail box</h2>
    </div>

  </>
}