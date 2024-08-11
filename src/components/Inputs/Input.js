import { StyleSheet, TextInput} from 'react-native';

export default function Input({placeHolder, setValor, setTextChange}) {
  return (
    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={setValor}
      placeholderTextColor={'#FFF'}
      onChangeText={setTextChange}
    />
  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'white',
    color: "#fff", 
    fontWeight:'800',
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    padding: 5,
    marginVertical:10
  },
});