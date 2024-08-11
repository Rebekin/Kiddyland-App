import { StyleSheet, TextInput} from 'react-native';

export default function Input({placeHolder, setValor, setTextChange}) {
  return (
    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={setValor}
      placeholderTextColor={'#60BFB2'}
      onChangeText={setTextChange}
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