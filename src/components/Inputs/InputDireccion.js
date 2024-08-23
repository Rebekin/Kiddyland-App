// src/components/Inputs/InputDireccion.js
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const InputDireccion = ({ placeHolder, direccion, setDireccion, setEditable }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeHolder}
                value={direccion}
                onChangeText={setDireccion}
                editable={setEditable}
                placeholderTextColor={'#60BFB2'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%', // Ajusta el ancho del contenedor según el diseño
        marginVertical: 15,
    },
    input: {
        backgroundColor: 'white',
        color: '#60BFB2',
        fontWeight: '800',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        padding: 10,
        borderRadius: 50,
    },
});

export default InputDireccion;
