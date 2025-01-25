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
  const [status, setStatus] = useState('unchecked');
  const [card, setCard] = useState('');
  console.log(order)
  const navigation = useNavigation()
  return (
    <View style={styles.container}  >
      <Text variant="displaySmall">Choose your payment method</Text>
      <Surface width="100%"  >
        <RadioButton.Group
          name="myRadioGroup"
          value={selected}
          onValueChange={(value) => {
            setSelected(value)
            // setStatus('checked')

          }}


        >

          {methods.map((item, index) => {
            return (

              <RadioButton.Item
                key={index}
                value={item.value}

                color='red'
                size="18"
                // style={{ float: 'left' }}
                // position='trailing'
                label={item.name}
                status='checked'

              >

              </RadioButton.Item>
            )
          })
          }
        </RadioButton.Group>
      </Surface>
      
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