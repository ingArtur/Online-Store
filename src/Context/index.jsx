import  { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
   
    //Shopping Cart . Increment quantity
    const [count, setCount] = useState(0)

    //Product Dentail . Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen (true)
    const closeProductDetail = () => setIsProductDetailOpen (false)

     //Checkout Side Menu . Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen (true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen (false)

    //Product Detail . Show product
    const [productToShow, setProductToShow] = useState({}) 

    // Shopping Cart . Add products to cart
    const [cartProducts, setCartProducts] = useState([])
    
    // Shopping Cart 
    const [order, setOrder] = useState([])

    //Get Product
    const [items, setItems] = useState(null)

    const [filteredItems, setFilteredItems] = useState(null)



    //Get product by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    //Get product by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    useEffect (() => {
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(data => setItems(data))
      }, [])


    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
      } 

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle)
        }

        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        }

        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if (!searchType) {
            return items
        }
    }



    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, searchByTitle, searchByCategory]); 
    

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow, 
            setProductToShow,
            cartProducts, 
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items, 
            setItems,
            searchByTitle, 
            setSearchByTitle,
            filteredItems,
            searchByCategory, 
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

// Definir PropTypes para ShoppingCartProvider
ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired // Asegurar que 'children' esté presente y sea de tipo 'node'
};

export default ShoppingCartContext;