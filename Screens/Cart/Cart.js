import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'


import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import { removeFromCart, clearCart } from '../../Redux/Actions/cartActions'
import { Surface, Divider, Avatar, Button } from 'react-native-paper';
var { height, width } = Dimensions.get("window");

const Cart = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cartItems)

    var total = 0;
    console.log("cart", cartItems)
    cartItems.forEach(cart => {
        return (total += cart.price)
    });
    const renderItem = ({ item, index }) =>
        <TouchableHighlight>
            <Surface pl="4" pr="5" py="2" bg="white" keyExtractor={item => item.id}>

                <Avatar.Image size={48} source={{
                    uri: item.image ?
                        item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                }} />

                <Text>
                    {item.name}
                </Text>

                <Divider />
                <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
                    $ {item.price}
                </Text>


            </Surface>
        </TouchableHighlight>;

    const renderHiddenItem = (cartItems) =>
        <TouchableOpacity
            onPress={() => dispatch(removeFromCart(cartItems.item))}
        >
            <Surface alignItems="center" style={styles.hiddenButton} >
                <View >
                    <Icon name="trash" color={"white"} size={30} bg="red" />
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Delete
                    </Text>
                </View>
            </Surface>

        </TouchableOpacity>;
    return (
        <>
            {cartItems.length > 0 ? (
                <Surface bg="white" safeArea flex="1" width="100%" >
                    <SwipeListView
                        data={cartItems}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        disableRightSwipe={true}
                        leftOpenValue={75}
                        rightOpenValue={-200}
                        previewOpenValue={-100}
                        previewOpenDelay={3000}
                        keyExtractor={item => item._id.$oid}
                    />
                </Surface>
            ) : (
                <Surface style={styles.emptyContainer}>
                    <Text >No items in cart
                    </Text>
                </Surface>
            )}
            <View style={styles.bottomContainer} width='100%' justifyContent='space-between'
            >
                <View justifyContent="space-between">
                    <Text style={styles.price}>$ {total.toFixed(2)}</Text>
                </View>
                <View justifyContent="space-between">
                    <Button
                        alignItems="center"
                        buttonColor="red"
                        onPress={() => dispatch(clearCart())} >Clear</Button>
                </View>
                <View justifyContent="space-between">

                    <Button
                        alignItems="center"
                        buttonColor="green"
                        onPress={() => navigation.navigate('Checkout')}>Check Out</Button>
                </View>

            </View >
        </>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        // width: 'lg'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    }
});
export default Cart