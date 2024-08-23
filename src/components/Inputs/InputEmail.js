import { StyleSheet, TextInput } from 'react-native';

export default function InputEmail({ placeHolder, setValor, setTextChange, setEditable }) {

    return (

        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#60BFB2'}
            onChangeText={setTextChange}
            keyboardType="email-address"
            editable={setEditable}
        />

    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',
        color: "#60BFB2",
        fontWeight: '800',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        padding: 10,
        marginVertical: 15,
        borderRadius: 50,
    },
});