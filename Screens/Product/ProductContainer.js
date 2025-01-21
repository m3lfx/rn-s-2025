import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { Surface, Text, TextInput, Searchbar } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import ProductList from './ProductList'
import Banner from "../Shared/Banner";
import SearchedProduct from "./SearchedProduct";
import CategoryFilter from "./CategoryFilter";

const data = require('../../assets/data/products.json')
const productCategories = require('../../assets/data/categories.json')


var { height, width } = Dimensions.get('window')


const ProductContainer = () => {
    const [products, setProducts] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState('');
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState([]);
    const [initialState, setInitialState] = useState([])
    const [productsCtg, setProductsCtg] = useState([])
    const [keyword, setKeyword] = useState('')


    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }
    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    const changeCtg = (ctg) => {
        {
            ctg === "all"
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                    setProductsCtg(
                        products.filter((i) => i.category.$oid === ctg),
                        setActive(true)
                    ),
                ];
        }
    };

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(productCategories)
        setActive(-1)
        setInitialState(data);
        setProductsCtg(data)

        return () => {
            setProducts([])
            setProductsFiltered([]);
            setFocus();
            setCategories([])
            setActive()
            setInitialState();
        }
    }, [])

    return (
        <Surface width="100%" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <Text variant="displaySmall">Search</Text>
            <Searchbar
                placeholder="Search"
                onChangeText={(text) => [searchProduct(text), setKeyword(text), setFocus(true)]}
                value={keyword}

                onClearIconPress={onBlur}

            />

            {focus === true ? (
                <SearchedProduct
                    productsFiltered={productsFiltered}
                />
            ) : (
                <ScrollView>
                    <View>
                        <Banner />
                    </View>
                    <View >
                        <CategoryFilter
                            categories={categories}
                            categoryFilter={changeCtg}
                            productsCtg={productsCtg}
                            active={active}
                            setActive={setActive}
                        />
                    </View>
                    {productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>
                            {productsCtg.map((item) => {
                                return (
                                    <ProductList
                                        // navigation={props.navigation}
                                        key={item._id.$oid}
                                        item={item}
                                    />
                                )
                            })}
                        </View>
                    ) : (
                        <View style={[styles.center, { height: height / 2 }]}>
                            <Text>No products found</Text>
                        </View>
                    )}

                </ScrollView>
            )}
        </Surface>


    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductContainer;