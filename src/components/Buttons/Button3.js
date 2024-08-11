import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


const Boton3 = ({ textoBoton, accionBoton }) => {
    return (
        <TouchableOpacity onPress={accionBoton} style={styles.button}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

export default Boton3;

const styles = StyleSheet.create({
    button: {
        margin: 5,
        width: 170,
        height: 40,
        backgroundColor: '#60BFB2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
});