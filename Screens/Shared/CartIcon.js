import React from "react";
import { StyleSheet } from "react-native";
// import { Badge, Text } from "native-base";
import { useSelector, } from 'react-redux'
import { Badge, Text } from 'react-native-paper';



const CartIcon = (props) => {
    const cartItems = useSelector(state => state.cartItems)
  return (
    <>
      {cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
    badge: {
      width: 20,
      position: "absolute",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      top: -2,
      right: -8,
    },
    text: {
      fontSize: 12,
      width: 100,
      fontWeight: "bold",
      color: "white"
      
    },
  })
  
  export default CartIcon