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
        backgroundColor: '#FFDE59',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
});