import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { useLocation } from "react-router-dom";

export const ShopContext =createContext();

const ShopContextProvider =( props ) =>{
    // Variable 

    const currency ="$";
    const delivery_fee =10;
    //Search Product
    const [search,setSearch] =useState('')
    const [showSearch, setShowSearch] = useState(true);
    const value = {
      products,
      currency,
      delivery_fee,
      search,
      setSearch,
      showSearch,
      setShowSearch,
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;