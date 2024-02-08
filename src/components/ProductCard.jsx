import React, {  useState } from 'react'
import { superbase } from '../SuperBaseClient';

function ProductCard(props) {

    const product = props.product;

    const [isEditing, setIsEditing] = useState(false)

    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    

    function handleName (event) {
      setName(event.target.value)
     
    }
    function handleDescription (event) {
      setDescription(event.target.value)
     
    }

    async function updateProduct (event) {
   
      try {
        const { data, error } = await superbase
        .from("products")
        .update({
          name: name,
          description: description,
        })
          .eq("id", product.id)

        if (error) throw error;
        window.location.reload();
      }catch (error) {
        alert(error.message)
      }
    }
    
    async function deleteProduct () {
      try {
        const {  error } = await superbase
        .from("products")
        .delete()
          .eq("id", product.id)

        if (error) throw error;
        window.location.reload();
      }catch (error) {
        alert(error.message)
      }
    }


  return (
    <>
       
        <div className='flex  flex-col gap-4 border rounded-lg
     p-2 border-black font-roboto py-2 mb-4'>
        

        <div className="">
            {
                isEditing ?
                 <>
                    <h2>Editing</h2>
                    <button onClick={() => setIsEditing(false)} 
                    className='bg-slate-500
                    text-white rounded-lg px-2'>
                    Go back</button> 
                    <br />
                    <br />
                    <form action="" className='flex flex-col gap-5 w-[300px]'>
                <input type="text" placeholder='Product Name'
                onChange={handleName} className='pl-2' id='name' 
                autoComplete='off' required defaultValue={product.name}/>


                <input type="text" placeholder='Product Description'
                 onChange={handleDescription} className='pl-2' id='description'
                 autoComplete='off' required defaultValue={product.description} />


                <button className='bg-blue-500 mx-auto flex items-center 
                text-white my-5 px-2 rounded-md shadow-sm shadow-white' 
                onClick={() => updateProduct()}>Update Product</button>
            </form>

                </>
                :
                <>
             <p>{product.name}</p>
            <p> {product.description}</p>
            <div className='flex gap-4 py-4'>
                <button className='bg-red-500
                 text-white rounded-lg px-2' 
                 onClick={() => deleteProduct()}>Delete Product</button>
                <button className='bg-green-600
                 text-white px-2 rounded-lg'
                 onClick={() => setIsEditing(true)}>Edit Product</button>
            </div>
                </>
            }
        </div>
    </div>
    </>
    
  )
}

export default ProductCard