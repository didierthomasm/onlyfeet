import React, { createContext, userContext } from 'react';
//import { useProductReducer } from './reducers'

const StoreCoontext = createContext ();
const { Provider } = StoreCoontext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
    });

    console.log(state);
    return <Provider value = {[state, dispatch]} {...props} />;
}

const useStoreContext = () => {
    return UseContext (StoreContext);
};

export { StoreProvider, useStoreContext }; 