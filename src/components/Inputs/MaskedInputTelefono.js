import React from 'react';
import { StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputTelefono({ telefono, setTelefono }) {
    return (
        <MaskedTextInput
            mask="9999-9999"
            placeholder='Teléfono:'
            placeholderTextColor="#60BFB2"
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
        backgroundColor: 'white',
        color: "#60BFB2",
        fontWeight: '800',
        width: 280,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        padding: 10,
        marginVertical: 15,
        borderRadius: 50,
    },
});