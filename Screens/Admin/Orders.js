import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from 'react-native'
import axios from 'axios'
import baseURL from "../../assets/common/baseurl";
import { useFocusEffect } from '@react-navigation/native'
import OrderCard from "../Shared/OrderCard"
const Orders = (props) => {
    const [orderList, setOrderList] = useState()

    useFocusEffect(
        useCallback(
            () => {
                getOrders();
                return () => {
                    setOrderList()
                }
            }, [],
        )
    )

    const getOrders = () => {
        axios.get(`${baseURL}orders`)
            .then((res) => {
                setOrderList(res.data)
            })
            .catch((error) => console.log(error))
    }

    return (

        <View>
            <FlatList
                data={orderList}
                renderItem={({ item }) => (
                    <OrderCard item={item} update={true} />
                )
                }
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Orders;