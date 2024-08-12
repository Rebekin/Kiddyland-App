import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ placeholder, date, setDate }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date || new Date();
        setShow(false);
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShow(true)}>
                <Text style={date ? styles.dateText : styles.placeholderText}>
                    {date ? date.toLocaleDateString() : placeholder}
                </Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    dateText: {
        fontSize: 16,
        color: '#000',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#999',  // Color gris claro para simular un placeholder
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
    },
});

export default DatePicker;
