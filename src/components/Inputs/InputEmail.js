import { StyleSheet, TextInput } from 'react-native';

export default function InputEmail({ placeHolder, setValor, setTextChange, setEditable }) {

    // Función que convierte el texto a minúsculas antes de actualizar el estado
    const handleTextChange = (text) => {
        // Convierte el texto a minúsculas
        const lowercasedText = text.toLowerCase();
        // Actualiza el valor del estado
        setTextChange(lowercasedText);
    };

    return (
        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#60BFB2'}
            onChangeText={handleTextChange} // Usa la función que convierte a minúsculas
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
