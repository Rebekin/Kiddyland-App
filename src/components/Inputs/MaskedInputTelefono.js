import React from 'react';
import { StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputTelefono({ telefono, setTelefono }) {
    return (
        <MaskedTextInput
            mask="9999-9999"
            placeholder='Telefono'
            placeholderTextColor="#fff"
            onChangeText={(text) => {
                setTelefono(text);
            }}
            style={styles.Input}
            keyboardType="numeric"
            value={telefono}
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#000000',
        color: "#fff",
        fontWeight: '800',
        width: 250,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        padding: 5,
        marginVertical: 10
    },
});