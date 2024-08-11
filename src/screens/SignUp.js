
import { StyleSheet, View, Alert, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/constantes'
//Import de componentes
import Input from '../components/Inputs/Input'
import InputPass from '../components/Inputs/MaskedInputPassword'
import ComboBox from '../components/Inputs/InputBox'
import Boton from '../components/Buttons/Button';
import Boton2 from '../components/Buttons/Button2';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

export default function SignUp({ navigation }) {

    const ip = Constantes.IP;

    // Estado de la app
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dui, setDui] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setconfirmarClave] = useState('');
    const [nacimientoCliente, setnacimientoCliente] = useState('');
    const [dirreccion, setDireccion] = useState('');

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    // Props que recibe input
    // placeHolder, setValor, contra, setTextChange

    const handleCreate = async () => {
        console.log("Entra al metodo")
        try {
            // Validar los campos
            if (!nombre.trim() || !apellido.trim() || !correo.trim() || !dirreccion.trim() ||
                !dui.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim() ||!nacimientoCliente.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            } 
            
            else if (!duiRegex.test(dui)) {
                Alert.alert("El DUI debe tener el formato correcto (########-#)");
                return;
            } 
            
            else if (!telefonoRegex.test(telefono)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            }

            console.log("Pasa la validacion")
            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', correo);
            formData.append('direccionCliente', dirreccion);
            formData.append('duiCliente', dui);
            formData.append('telefonoCliente', telefono);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);
            formData.append('nacimientoCliente', nacimientoCliente);

            const response = await fetch(`${ip}/Kiddyland/api/services/public/clientes.php?action=signUp`, {
                method: 'POST',
                body: formData
            });

            console.log("Pasa la peticion")

            const data = await response.json();
            if (data.status) {
                console.log("Entro al status")
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Sesion');
            } 
            
            else {
                console.log("Error status")
                Alert.alert('Error', data.error);
            }
        }

        catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };

    const handleNavigateToLogin = async () => {
        // Función para navegar a la pantalla de login
        navigation.navigate('Sesion');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />
                <Input
                    placeHolder="Nombre(s):"
                    setValor={nombre}
                    setTextChange={setNombre}
                />
                <Input
                    placeHolder="Apellido(s):"
                    setValor={apellido}
                    setTextChange={setApellido}
                />
                <InputEmail
                    placeHolder='Correo electronico'
                    setValor={correo}
                    setTextChange={setCorreo}
                    setEditable={true}
                />
                <MaskedInputTelefono
                    placeHolder="Teléfono:"
                    setValor={telefono}
                    setTelefono={setTelefono}
                />
                <MaskedInputDui
                    placeHolder="DUI:"
                    setValor={dui}
                    setDui={setDui}
                    setEditable={true}
                />
                <InputPass
                    placeHolder="Contraseña:"
                    setValor={clave}
                    setTextChange={setClave}
                    secureTextEntry
                />
                <InputPass
                    placeHolder="Confirmar contraseña:"
                    setValor={confirmarClave}
                    setTextChange={setconfirmarClave}
                    secureTextEntry
                />
                <InputPass
                    placeHolder="Fecha de nacimiento:"
                    setValor={setnacimientoCliente}
                    setTextChange={setnacimientoCliente}
                />
                <ComboBox
                    placeHolder='Dirección'
                    setValor={setDireccion}
                    setTextChange={setDireccion}
                />
                <Boton2
                    mode="contained"
                    textoBoton='Registrarse'
                    accionBoton={handleCreate}
                >
                </Boton2>
                <Boton
                    textoBoton="Regresar al inicio."
                    accionBoton={handleNavigateToLogin}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000000',
    },
    scrollViewContent: {
        flexGrow: 1, // Asegura que el contenido se expanda para ajustarse al ScrollView
    },
    logo: {
        width: 300,
        height: 150,
        alignSelf: 'center',
    },
});