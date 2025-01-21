import React from 'react';
import { View, StyleSheet, Dimensions,  } from 'react-native'

import { FlatList, TouchableOpacity } from 'react-native';
import { Surface, Text, Avatar, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
var { width } = Dimensions.get("window")

const SearchedProduct = ({ productsFiltered }) => {
    const navigation = useNavigation();
    return (

        <View style={{ width: width }}>
            {productsFiltered.length > 0 ? (

                <Surface >
                    <FlatList data={productsFiltered}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{ width: '50%' }}
                                onPress={() => navigation.navigate("Product Detail", { item})
                                }>
                                <Surface width="90%">
                                    <Avatar.Image size={24}
                                        source={{
                                            uri: item.image ?
                                                item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                        }} />
                                    <Text variant="labelMedium">{item.name}</Text>
                                    <Text variant="labelMedium">{item.description}</Text>
                                    <Divider />
                                    <Text variant="labelMedium">
                                        {item.price}
                                    </Text>
                                </Surface>

                            </TouchableOpacity>}
                          
                        keyExtractor={item => item._id} />
                </Surface >
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </View >

    );
};


const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    listContainer: {
        // height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
})

export default SearchedProduct;