import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import ProductCard from "./ProductCard";
import { useNavigation } from '@react-navigation/native';
var { width } = Dimensions.get("window")

const ProductList = ({ item }) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{ width: '50%' }} 
            onPress={() => navigation.navigate("Product Detail", { item })} >

            <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    )
}
export default ProductList;