import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import baseURL from "../../assets/common/baseurl"
import { useNavigation } from '@react-navigation/native'

const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];
const OrderCard = ({ item, }) => {
  console.log(item)
  const [orderStatus, setOrderStatus] = useState('');
  const [statusText, setStatusText] = useState('');
  const [statusChange, setStatusChange] = useState(item.status);
  const [token, setToken] = useState('');
  const [cardColor, setCardColor] = useState('');

  const navigation = useNavigation() 

  const updateOrder = () => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const order = {
      city: item.city,
      country: item.country,
      dateOrdered: item.dateOrdered,
      id: item.id,
      orderItems: item.orderItems,
      phone: item.phone,
      shippingAddress1: item.shippingAddress1,
      shippingAddress2: item.shippingAddress2,
      status: statusChange,
      totalPrice: item.totalPrice,
      user: item.user,
      zip: item.zip,
    };
    axios
      .put(`${baseURL}orders/${item.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Updated",
            text2: "",
          });
          setTimeout(() => {
            navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  }
  useEffect(() => {
    if (item.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setCardColor("#E74C3C");
    } else if (item.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#F1C40F");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#2ECC71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  return (

    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Order Number: #{item.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>
          Address: {item.shippingAddress1} {item.shippingAddress2}
        </Text>
        <Text>City: {item.city}</Text>
        <Text>Country: {item.country}</Text>
        <Text>Date Ordered: {item.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ {item.totalPrice}</Text>
        </View>
        {/* {item.editMode ? ( */}
        <View>
          <>
            <Picker
              width="80%"

              style={{ width: undefined }}
              selectedValue={statusChange}
              color="white"
              placeholder="Change Status"
              placeholderTextColor="white"
              placeholderStyle={{ color: '#FFFFFF' }}
              placeholderIconColor="#007aff"
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => {
                return <Picker.Item
                  key={c.code}
                  label={c.name}
                  value={c.code}
                />
              })}
            </Picker>
            <EasyButton
              secondary
              large
              onPress={() => updateOrder()}
            >
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton>
          </>



        </View>
       
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;