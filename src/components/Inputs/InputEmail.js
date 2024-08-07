import { StyleSheet, TextInput } from 'react-native';

export default function InputEmail({ placeHolder, setValor, setTextChange, setEditable }) {

    return (

        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#FFF'}
            onChangeText={setTextChange}
            keyboardType="email-address"
            editable={setEditable}
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