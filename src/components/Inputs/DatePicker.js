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

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Asegúrate de usar guiones (-) y no barras (/)
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShow(true)}>
                <Text style={date ? styles.dateText : styles.placeholderText}>
                    {date ? formatDate(date) : placeholder}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
