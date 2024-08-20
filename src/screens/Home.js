import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Boton2 from '../components/Buttons/Button2';
import Boton3 from '../components/Buttons/Button3';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation }) {
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const ip = Constantes.IP;

    const handleLogout = async () => {
        try {
            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=logOut`, {
                method: 'GET'
            });

            const data = await response.json();
            console.log(data);
            if (data.status) {
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    const irActualizar = () => {
        navigation.navigate('Productos');
    };

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                console.log(data.name);
                if (data.name) {
                    console.log(data.name);
                    setNombre(data.name.nombre_cliente);
                    setApellido(data.name.apellido_cliente);
                } else {
                    Alert.alert('Error', 'No se encontraron los datos del usuario');
                }
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cargar la sesión');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getUser();
        }, [])
    );

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Bienvenido a Kiddyland</Text>
            <Text style={styles.subtitle}>
                {nombre ?  nombre : 'No hay Nombre para mostrar'}
            </Text>
            <Text style={styles.subtitle}>
                {apellido ? apellido  : 'No hay Apellido para mostrar'}
            </Text>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.image}
            />
            <Text style={styles.subtitle2}>Somos la mejor opción para la diversión de tus hijos</Text>
            <Boton2
                textoBoton='Ver Productos'
                accionBoton={irActualizar}
            />
            <Boton3
                textoBoton='Cerrar Sesión'
                accionBoton={handleLogout}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8FC2BB',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, // Agrega espacio lateral
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 10, // Aumenta el espacio debajo de la imagen
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 5, // Espacio adicional debajo del título
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 5,
        color: 'white',
    },
    button: {
        width: '80%',
        marginVertical: 10, // Espacio entre botones
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18, // Texto más grande en el botón
    }, subtitle2: {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 5,
        color: 'white',
        margin: 30,
    },
});
