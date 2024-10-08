import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


const ButtonPrimero = ({ textoBoton, accionBoton }) => {
    return (
        <TouchableOpacity onPress={accionBoton} style={styles.button}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

export default ButtonPrimero;

const styles = StyleSheet.create({
    button: {
        textAlign: 'end',
        color: '#60BFB2',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
    },
});