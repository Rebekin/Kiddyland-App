import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


const ButtonSecundario = ({ textoBoton, accionBoton }) => {
    return (
        <TouchableOpacity onPress={accionBoton} style={styles.button}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

export default ButtonSecundario;

const styles = StyleSheet.create({
    button: {
        margin: 5,
        width: 170,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#60BFB2',
    },
});