import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Button, Text } from "react-native";
import { Surface, Avatar, Divider } from 'react-native-paper';


import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
// import AsyncStorage from "@react-native-async-storage/async-storage"


var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
    const [token, setToken] = useState();
    // const confirm = props.route.params;
    const finalOrder = props.route.params;
    console.log("order", finalOrder)
    const dispatch = useDispatch()
    // let navigation = useNavigation()

    
    return (
        <Surface>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
                    {props.route.params ? (
                        <View style={{ borderWidth: 1, borderColor: "orange" }}>
                            <Text style={styles.title}>Shipping to:</Text>
                            <View style={{ padding: 8 }}>
                                <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                                <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                                <Text>City: {finalOrder.order.order.city}</Text>
                                <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                                <Text>Country: {finalOrder.order.order.country}</Text>
                            </View>
                            <Text style={styles.title}>items</Text>

                            {finalOrder.order.order.orderItems.map((item) => {
                                return (
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
                                )
                            })}
                        </View>
                    ) : null}
                    <View style={{ alignItems: "center", margin: 20 }}>
                        <Button
                            title={"Place order"}
                            // onPress={confirmOrder}
                        />
                    </View>
                </View>
            </ScrollView>
        </Surface>
    )

}
const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: "center",
        backgroundColor: "white",
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    title: {
        alignSelf: "center",
        margin: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    listItem: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        width: width / 1.2,
    },
    body: {
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
    },
});
export default Confirm;