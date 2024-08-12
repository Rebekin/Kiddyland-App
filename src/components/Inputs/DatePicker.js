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
                    value={date || new Date()}  // Asegurando que haya un valor por defecto
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    dateText: {
        backgroundColor: 'white',
        color: "#60BFB2",
        fontWeight: '800',
        width: 280,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        padding: 15,
        marginVertical: 15,
        borderRadius: 50,
    },
    placeholderText: {
        backgroundColor: 'white',
        color: "#60BFB2",
        fontWeight: '800',
        width: 280,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        padding: 15,
        marginVertical: 15,
        borderRadius: 50,
    },
});

export default DatePicker;
