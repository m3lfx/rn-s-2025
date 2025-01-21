import React, { useEffect, useState, useContext } from 'react'
import { Text, View, Button, SafeAreaView, Select } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import FormContainer from '../../Shared/FormContainer'
import Input from '../../Shared/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import { Dropdown } from 'react-native-paper-dropdown';
const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {
    const [user, setUser] = useState('')
    const [orderItems, setOrderItems] = useState([])
    const [address, setAddress] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('Philippines')
    const [phone, setPhone] = useState('')

    const navigation = useNavigation()
    const cartItems = useSelector(state => state.cartItems)

    useEffect(() => {
        setOrderItems(cartItems)

        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        console.log("orders", orderItems)
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            // user,
            zip,
        }
        console.log("ship", order)
        navigation.navigate("Payment", { order })
    }
    return (

        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                 <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                <Dropdown
                    label="countries"
                    placeholder="Select Country"
                    options={countries}
                    value={country}
                    onSelect={setCountry}
                    width="80%"
                    
                    placeholderStyle={{ color: '#007aff' }}
                    placeholderIconColor="#007aff"

                /> 
               

                <View style={{ width: '80%', alignItems: "center" }}>
                    <Button title="Confirm" onPress={() => checkOut()} />
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>

    )
}

export default Checkout