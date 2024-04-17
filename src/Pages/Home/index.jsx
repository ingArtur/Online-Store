import { useContext } from "react"
import Layout  from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from '../../Components/ProductDetail/index'
import {ShoppingCartContext} from '../../Context'

function Home() {
 
  const context = useContext (ShoppingCartContext)

  const renderView = () => {
    if ( context.filteredItems?.length > 0) {
        return (
          context.filteredItems?.map(item => (
            <Card 
            key={item.id}
            data={item}/>
          ))   
        )
      } else {
        return (
        <div> <p>We don&apos;t have anything</p></div>
        )
      }

    } 

    return (
         <Layout>
          <div className='flex  items-center justify-center relative w-80 mb-6'>
         <h1 className='font-medium text-xl'> Exclusive Products </h1>
          </div>
          <input 
          type='text'  
          placeholder='Search a product'
          className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
          onChange={(event) => context.setSearchByTitle(event.target.value)}/>
          
         <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
         {renderView()}
        </div>
        <ProductDetail />
        </Layout>
    )
  }
  
  export default Home