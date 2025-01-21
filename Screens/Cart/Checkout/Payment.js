import React, { useState } from 'react'
import { View, Button, StyleSheet, Pressable, FlatList, TouchableOpacity, Dimensions, } from 'react-native'
import { Surface, RadioButton, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    { name: 'Card Payment', value: 3 }
]

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3 },
    { name: 'Other', value: 4 }
]

const Payment = ({ route }) => {

    const order = route.params;
    const [selected, setSelected] = useState('');
    const [card, setCard] = useState('');
    console.log(order)
    const navigation = useNavigation()
    return (
        <View style={styles.container}  >
             <Text variant="displayLarge">Choose your payment method</Text>
            <Surface  width="100%"  >
                <RadioButton.Group
                    name="myRadioGroup"
                    value={selected}
                    onValueChange={(value) => {
                        setSelected(value);
                    }}

                >
                    {console.log(selected)}
                    {methods.map((item, index) => {
                        return (
                            <>
                             <RadioButton
                                key={index}
                                value={item.value} my="1"
                                colorScheme="green"
                                size="22"
                                style={{ float: 'right' }}
                               

                            >
                                
                            </RadioButton>
                            <Text>{item.name}</Text>
                            </>
                           
                        )
                    })
                    }
                </RadioButton.Group>
            </Surface>
            {/* {selected === 3 ? (
                <Box>
                    <Select
                        minWidth="100%"
                        placeholder="Choose Service"
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                    >
                        {console.log(card)}
                        {paymentCards.map((c, index) => {
                            return (
                                <Select.Item
                                    key={c.name}
                                    label={c.name}
                                    value={c.name} />
                            )
                        })}

                    </Select>
                </Box>
            ) : null} */}
            <View style={{ marginTop: 60, alignSelf: 'center' }}>
                <Button
                    title={"Confirm"}
                    onPress={() => navigation.navigate("Confirm", { order })} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
})
export default Payment;