import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function CustomComboBox({ placeHolder, setValor }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) => {
        setValor(option);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.inputContainer} onPress={handleToggleDropdown}>
                <RNPickerSelect
                    style={{
                        inputIOS: styles.input,
                        inputAndroid: styles.input,
                    }}
                    placeholder={{
                        label: placeHolder,
                        value: null,
                    }}
                    onValueChange={(value) => setValor(value)}
                    items={[
                        { label: 'Femenino', value: 'Femenino' },
                        { label: 'Masculino', value: 'Masculino' },
                    ]}
                />
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={() => handleSelectOption('Femenino')}>
                        <Text style={styles.optionText}>Femenino</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelectOption('Masculino')}>
                        <Text style={styles.optionText}>Masculino</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginVertical: 10,
    },
    inputContainer: {
        backgroundColor: 'white',
        width: 250,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    input: {
        color: '#FFF',
    },
    dropdown: {
        top: 40,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    optionText: {
        color: '#000000',
    },
    
});