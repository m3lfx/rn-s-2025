import Input from "../Shared/Input";
import React, {useState} from "react";
import {View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FormContainer from "../Shared/FormContainer";


const Login = (props) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
       <FormContainer >
            <Input 
                placeholder={"Enter email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input 
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text)=> setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                <Button title="Login" />
            </View>
            <View style={styles.buttonGroup}>
                <Text style={styles.middleText}>Dont' Have an Account yet?</Text>
                <Button title="register" onPress={() => navigation.navigate("Register")} /> 
            </View>
       </FormContainer>
    )
}
const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      alignItems: "center",
    },
    middleText: {
      marginBottom: 100,
      alignSelf: "center",
    },
  });
export default Login;