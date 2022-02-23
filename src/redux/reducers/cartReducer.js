import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"

export default function cartReducer(state=initialState.cart, action){
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            var addedItem = state.find(c=>c.product.id === action.payload.product.id);
            if(addedItem) {
                var newState = state.map(cartItem=>{
                    if(cartItem.product.id===action.payload.product.id){
                        return Object.assign({},addedItem,{quantity:addedItem.quantity+1})
                    }
                    return cartItem;
                })
                return newState;
            }else{

                // state in bir kopyasını al, ve o kopyaya action ile gelen payloadı ekle
                return [...state,{...action.payload}]
            }
        case actionTypes.REMOVE_FROM_CART:
            //  const newState2 = state.filter(cartItem=>cartItem.product.id!==action.payload.id)
                var addedItem2 = state.find((c) => c.product.id === action.payload.id);
                if(addedItem2 && addedItem2.quantity>1 ) {
                    var newState2 = state.map(cartItem=>{
                        if(cartItem.product.id===action.payload.id){
                            return Object.assign({},addedItem2,{quantity:addedItem2.quantity-1})
                        }
                        return cartItem;
                    })
                    return newState2;
                }
                else {
                var newCart = state.filter((c) => c.product.id !== action.payload.id);
                return newCart
              }
              
        default:
            return state;
    }
}