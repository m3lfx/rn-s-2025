import React, { useCallback, useState, useContext,  } from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
import baseURL from "../../assets/common/baseurl";
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import OrderCard from "../Shared/OrderCard"

import AuthGlobal from "../../Context/Store/AuthGlobal"

const MyOrders = (props) => {
    const context = useContext(AuthGlobal)
    
    const [orderList, setOrderList] = useState()
    const [orders, setOrders] = useState([])
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                navigation.navigate("Login")
            }
            axios
                .get(`${baseURL}orders`)
                .then((res) => {
                    // console.log(data)
                    const userOrders = res.data.filter(
                        (order) =>
                            // console.log(order)
                            order.user ? (order.user.id === context.stateUser.user.userId) : false

                    );
                    setOrders(userOrders);
                })
                .catch((error) => console.log(error))
            return () => {
                setOrders();
            }

        }, [context.stateUser.isAuthenticated]))



    return (

        <View style={styles.order}>
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <OrderCard item={item} update={false} />
                )
                }
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})
export default MyOrders;