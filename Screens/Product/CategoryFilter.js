import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList, View, Text } from 'react-native';
// import { Badge, Text, VStack, Divider, HStack } from 'native-base';
import { Badge,  } from 'react-native-paper';

const CategoryFilter = (props) => {

    return (

        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }}
        >
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge style={[styles.center, { margin: 4 },
                    props.active === -1 ? styles.active : styles.inactive]}  >
                        <Text style={{ color: 'white' }}>all</Text>
                    </Badge>
                </TouchableOpacity>
                {props.categories.map((item) => (
                    <TouchableOpacity
                        key={item._id.$oid}
                        onPress={() => {
                            props.categoryFilter(item._id.$oid),
                                props.setActive(props.categories.indexOf(item))
                        }}
                    >
                        <Badge
                            style={[styles.center,
                            { margin: 5 },
                            props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                            ]}
                        >
                            <Text style={{ color: 'white' }}>{item.name}</Text>
                        </Badge>
                    </TouchableOpacity>
                ))}

            </View>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter;