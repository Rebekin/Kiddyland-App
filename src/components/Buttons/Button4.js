import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


const Boton4 = ({ textoBoton, accionBoton }) => {
    return (
        <TouchableOpacity onPress={accionBoton} style={styles.button}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

export default Boton4;

const styles = StyleSheet.create({
    button: {
        margin: 5,
        width: 170,
        height: 40,
        backgroundColor: '#AD6638',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
});