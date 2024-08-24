import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert, Text } from 'react-native';
import InputEmail from '../components/Inputs/InputEmail';
import InputPass from '../components/Inputs/MaskedInputPassword';
import ButtonPrimero from '../components/Buttons/ButtonPrimero'; // Suponiendo que es el Boton2
import ButtonSecundario from '../components/Buttons/ButtonSecundario'; // Suponiendo que es el Boton3
import ButtonBlanco from '../components/Buttons/ButtonBlanco'; // Suponiendo que es el Boton
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

export default function Sesion({ navigation }) {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const ip = Constantes.IP;

    useFocusEffect(
        React.useCallback(() => {
            validarSesion();
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
                console.log("Se ingresa con la sesión activa");
            } else {
                console.log("No hay sesión activa");
                return;
            }
        } catch (error) {
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
            formData.append('correoCliente', correo);
            formData.append('claveCliente', clave);

            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=logIn`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                setClave('');
                setCorreo('');
                navigation.navigate('TabNavigator');
            } else {
                console.log(data);
                Alert.alert('Error sesión', data.error);
            }
        } catch (error) {
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
                console.log("Sesión Finalizada");
            } else {
                console.log('No se pudo eliminar la sesión');
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    const handleNavigateToRegister = async () => {
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
            <ButtonPrimero
                mode="contained"
                textoBoton='Iniciar sesión'
                accionBoton={handlerLogin}
            />
            <ButtonSecundario
                mode="contained"
                textoBoton='Cerrar sesión'
                accionBoton={cerrarSesion}
            />
            <ButtonBlanco
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
    text: {
        color: 'white',
        marginTop: 80,
        fontWeight: '800',
        fontSize: 20,
    },
    text2: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15,
    }
});
