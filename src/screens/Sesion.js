import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert, Text } from 'react-native';
import InputEmail from '../components/Inputs/InputEmail'
import InputPass from '../components/Inputs/MaskedInputPassword'
import Boton from '../components/Buttons/Button';
import Boton2 from '../components/Buttons/Button2';
import Boton3 from '../components/Buttons/Button3';
import * as Constantes from '../utils/constantes'
import { useFocusEffect } from '@react-navigation/native';

export default function Sesion({ navigation }) {

    // Estado de la app
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    const ip = Constantes.IP;

    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            validarSesion(); // Llama a la función getDetalleCarrito.
        }, [])
    );

    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 1) {
                navigation.navigate('TabNavigator');
                console.log("Se ingresa con la sesión activa")
            } 
            
            else {
                console.log("No hay sesión activa")
                return
            }
        } 
        
        catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    };

    const handlerLogin = async () => {
        if (!correo || !clave) {
            Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('correo', correo);
            formData.append('clave', clave);

            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=logIn`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                setClave('')
                setCorreo('')
                navigation.navigate('TabNavigator');
            } 
            
            else {
                console.log(data);
                Alert.alert('Error sesión', data.error);
            }
        } 
        
        catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    const cerrarSesion = async () => {
        try {
            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=logOut`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status) {
                console.log("Sesión Finalizada")
            } 
            
            else {
                console.log('No se pudo eliminar la sesión')
            }
        }
        
        catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    const handleNavigateToRegister = async () => {
        // Función para navegar a la pantalla de registro
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>

            <Text style={styles.text}>BIENVENIDO A KIDDYLAND</Text>
            <Text style={styles.text2}>Toy feliz en mi mundo</Text>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <InputEmail
                placeHolder='Correo electronico'
                setValor={correo}
                setTextChange={setCorreo}
                setEditable={true}
            />
            <InputPass
                placeHolder='Contraseña'
                setValor={clave}
                setTextChange={setClave}
            />
            <Boton2
                mode="contained"
                textoBoton='Iniciar sesión'
                accionBoton={handlerLogin}
            />
            <Boton3
                mode="contained"
                textoBoton='Cerrar sesión'
                accionBoton={cerrarSesion}
            />
            <Boton
                textoBoton="¿No tienes una cuenta? crea una aquí"
                accionBoton={handleNavigateToRegister}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#8FC2BB',
    },
    logo: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginBottom: 10,
    },
    text:{
        color: 'white',
        marginTop: 80,
        fontWeight:'800',
        fontSize: 20,
    },
    text2:{
        color: 'white',
        fontWeight:'500',
        fontSize: 15,
    }
});