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
            const response = await fetch(`${ip}/P-Z/api/services/public/clientes.php?action=logOut`, {
                method: 'GET'
            });

            const data = await response.json();
            if (data.status) {
                navigation.navigate('Sesion');
            } 
            
            else {
                Alert.alert('Error', data.error);
            }
        } 
        
        catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    const irActualizar = () => {
        navigation.navigate('Productos');
    };

    const EditUser = () => {
        navigation.navigate('UpdateUser');
    };

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/P-Z/api/services/public/clientes.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();
            if (data.status) {
                setNombre(data.name.nombre_cliente);
                setApellido(data.name.apellido_cliente);
            } 
            
            else {
                Alert.alert('Error', data.error);
            }
        } 
        
        catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    // logica para cargar los datos del usuario al cargar la pantalla
    useFocusEffect(
        React.useCallback(() => {
            getUser();
        }, [])
    );
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Bienvenid@</Text>
            <Text style={styles.subtitle}>
                {nombre ? '"' + nombre + ' ' : 'No hay Nombre para mostrar'}
                {apellido ? apellido + '"' : 'No hay Apellido para mostrar'}
            </Text>
            <Boton2
                textoBoton='Ver Productos'
                accionBoton={irActualizar}
            />
            <Boton2
                textoBoton='Mi perfil'
                accionBoton={EditUser}
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
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 400,
        height: 100,
        marginBottom: 10
    },
    button: {
        borderWidth: 2,
        borderColor: "black",
        width: 100,
        borderRadius: 10,
        backgroundColor: "darkblue"
    },
    buttonText: {
        textAlign: 'center',
        color: "white"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#838484', // Brown color for the title
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 5,
        marginBottom: 20,
        color: '#838484', // Brown color for the title
    },
});