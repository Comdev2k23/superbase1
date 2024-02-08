import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import {superbase} from '../SuperBaseClient'

function Form() {

      const [name, setName] = useState("")
      const [description, setDescription] = useState("")
      const [products, setProducts] = useState([])

      function handleName (event) {
        setName(event.target.value)
       
      }
      function handleDescription (event) {
        setDescription(event.target.value)
       
      }

      useEffect (() => {
        getProducts();
      }, [])

      async function getProducts () {
        try {
          const {data, error } = await superbase
          .from("products")
          .select("*")
          .limit(10)
          if (error) throw error;
          if (data != null) {
            setProducts(data); // array of products [product1,product2 etc..]
          }
        }
        catch (error) {
          alert(error.message)
        }
      }

      async function createProduct () {
        try {
          const {  error } = await superbase
          .from("products")
          .insert({
            name: name,
            description: description,
          })
            .single()

          if (error) throw error;
          window.location.reload();
        }catch (error) {
          alert(error.message)
        }
      }
      
  return (
    <div className='container mx-auto bg-slate-400 mt-7 rounded-lg
    font-roboto '>
        <div className=" flex flex-col justify-center items-center">
            <h2 className='text-2xl py-4 font-bold'>Create Product for Superbase DB</h2>
            <form action="" className='flex flex-col gap-5 w-[500px]'>
                <input type="text" placeholder='Product Name'
                onChange={handleName} className='pl-2' id='name' 
                autoComplete='off' required/>


                <input type="text" placeholder='Product Description'
                 onChange={handleDescription} className='pl-2' id='description'
                 autoComplete='off' required />


                <button className='bg-blue-500 mx-auto flex items-center 
                text-white my-5 px-2 rounded-md shadow-sm shadow-white' 
                onClick={() => createProduct()}>Create Product</button>
            </form>
            <hr />
            <div>
            <h2 className='text-xl'>Current Database Items</h2>
            {products.map((product) => (
              <div >
                <ProductCard product={product} />
              </div>
            ))}
            </div>
           
        </div>
    </div>  
  )
}

export default Form