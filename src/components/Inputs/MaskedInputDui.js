import React from 'react';
import { StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputDui({ dui, setDui, setEditable }) {
    return (
        <MaskedTextInput
            mask="99999999-9"
            placeholder='Dui:'
            placeholderTextColor="#60BFB2"
            onChangeText={(text) => {
                setDui(text);
            }}
            style={styles.Input}
            keyboardType="numeric"
            editable={setEditable}
            value={dui}
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