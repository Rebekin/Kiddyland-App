import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes'
// Import de componentes
import Input from '../components/Inputs/Input'
import Boton2 from '../components/Buttons/Button2';
import Boton4 from '../components/Buttons/Button4';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

export default function UpdateUser({ navigation }) {

    const ip = Constantes.IP;

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dui, setDui] = useState('');
    const [genero, setGenero] = useState('');

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    // Funcion para llenar los inputs con los datos del usuario
    const fillData = async () => {
        try {
            const response = await fetch(`${ip}/P-Z/api/services/public/clientes.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();
            console.log("Data en actualizar consultada", data);
            if (data.status) {
                console.log(data.name, 'Valor de editar perfil')
                setNombre(data.name.nombre_cliente);
                setApellido(data.name.apellido_cliente);
                setCorreo(data.name.correo_cliente);
                setGenero(data.name.genero_cliente);
                setDui(data.name.dui_client);
                setTelefono(data.name.telf_cliente);
            } 
            
            else {
                Alert.alert('Error', data.error);
            }
        }

        catch (error) {
            Alert.alert('Ocurrió un error al intentar obtener los datos del usuario');
        }
    };

    // Logica para cargar los datos del usuario al cargar la pantalla
    useFocusEffect(
        React.useCallback(() => {
            fillData();
        }, [])
    );

    const editProfile = async () => {
        try {
            console.log("Datos a enviar", nombre, apellido, correo, genero, dui, telefono)

            // Validar los campos
            if (!nombre.trim() || !apellido.trim() || !correo.trim() || !genero.trim() ||
                !dui.trim() || !telefono.trim()) {
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

            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreClientePerfil', nombre);
            formData.append('apellidoClientePerfil', apellido);
            formData.append('correoClientePerfil', correo);
            formData.append('generoClientePerfil', genero);
            formData.append('duiClientePerfil', dui)
            formData.append('telefonoClientePerfil', telefono);
            const response = await fetch(`${ip}/P-Z/api/services/public/clientes.php?action=editProfile`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data, "Data desde Editar Perfil OK")
            if (data.status) {
                console.log(data, 'Valor de editar perfil OK')
                Alert.alert('Perfil editado correctamente', '', [
                    { text: 'OK', onPress: () => fillData() },
                ], { icon: 'success' });
            } 
            
            else {
                Alert.alert('Error', data.error);
            }
        } 
        
        catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };

    const volverInicio = () => {
        navigation.navigate('TabNavigator');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Datos del perfil</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Nombre(s):</Text>
                    <Input
                        placeHolder="Nombre(s):"
                        setValor={nombre}
                        setTextChange={setNombre}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Apellido(s):</Text>
                    <Input
                        placeHolder="Apellido(s):"
                        setValor={apellido}
                        setTextChange={setApellido}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Correo electronico:</Text>
                    <InputEmail
                        placeHolder='Correo electronico:'
                        setValor={correo}
                        setTextChange={setCorreo}
                        setEditable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Telefono:</Text>
                    <MaskedInputTelefono
                        placeHolder='Teléfono:'
                        telefono={telefono}
                        setTelefono={setTelefono}
                        setEditable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Dui:</Text>
                    <MaskedInputDui
                        placeHolder='Documento de identidad:'
                        dui={dui}
                        setDui={setDui}
                        setEditable={false}
                    />
                </View>
                <Boton4
                    textoBoton='Editar Usuario'
                    accionBoton={editProfile}
                />
                <Boton2
                    textoBoton='Volver al Inicio'
                    accionBoton={volverInicio}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        marginTop: 120,
        marginBottom: 15,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 22
    },
    title: {
        marginTop: 10,
        color: '#838484',
        fontWeight: '500',
        fontSize: 16
    },
});