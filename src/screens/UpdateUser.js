import { StyleSheet, Text, View, Alert, ScrollView, Modal, Button } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes';
// Import de componentes
import Input from '../components/Inputs/Input';
import Boton2 from '../components/Buttons/ButtonSecundario';
import Boton3 from '../components/Buttons/ButtonBlanco';
import Boton4 from '../components/Buttons/ButtonCafe';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import InputDireccion from '../components/Inputs/InputDireccion'; // Asegúrate de crear este componente

export default function UpdateUser({ navigation }) {
    const ip = Constantes.IP;

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [dui, setDui] = useState('');
    const [direccion, setDireccion] = useState('');

    // Estado para el modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalNombre, setModalNombre] = useState('');
    const [modalApellido, setModalApellido] = useState('');
    const [modalTelefono, setModalTelefono] = useState('');
    const [modalDireccion, setModalDireccion] = useState('');

    // Expresiones regulares para validar teléfono
    const telefonoRegex = /^\d{4}-\d{4}$/;

    // Funcion para llenar los inputs con los datos del usuario
    const fillData = async () => {
        try {
            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();
            console.log("Data en actualizar consultada", data);
            if (data.status) {
                console.log(data.name, 'Valor de editar perfil');
                setNombre(data.name.nombre_cliente);
                setApellido(data.name.apellido_cliente);
                setTelefono(data.name.telefono_cliente);
                setDireccion(data.name.direccion_cliente);
                setDui(data.name.dui_cliente);
                setCorreo(data.name.correo_cliente);
            } else {
                Alert.alert('Error', data.error || 'Error desconocido');
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar obtener los datos del usuario');
        }
    };

    // Logica para cargar los datos del usuario al cargar la pantalla
    useFocusEffect(
        useCallback(() => {
            fillData();
        }, [])
    );

    const handleLogout = async () => {
        try {
            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=logOut`, {
                method: 'GET'
            });

            const data = await response.json();
            if (data.status) {
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error || 'Error desconocido');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    const editProfile = async () => {
        try {
            console.log("Datos a enviar", modalNombre, modalApellido, modalTelefono, modalDireccion);

            // Validar los campos
            if (!modalNombre.trim() || !modalApellido.trim() || !modalTelefono.trim() || !modalDireccion.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            } else if (!telefonoRegex.test(modalTelefono)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            }

            // Si todos los campos son válidos, proceder con la edición del perfil
            const formData = new FormData();
            formData.append('nombreCliente', modalNombre);
            formData.append('apellidoCliente', modalApellido);
            formData.append('correoCliente', correo); // Asegúrate de enviar el correo
            formData.append('telefonoCliente', modalTelefono);
            formData.append('direccionCliente', modalDireccion);
            formData.append('duiCliente', dui); // Asegúrate de enviar el DUI

            const response = await fetch(`${ip}/Kiddyland/api/services/public/cliente.php?action=editProfile`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data, "Data desde Editar Perfil OK");
            if (data.status) {
                console.log(data, 'Perfil editado correctamente');
                Alert.alert('Perfil editado correctamente', '', [
                    {
                        text: 'OK', onPress: () => {
                            fillData();
                            setIsModalVisible(false); // Cierra el modal
                        }
                    },
                ]);
            } else {
                Alert.alert('Error', data.error || 'Error desconocido');
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar editar el perfil');
        }
    };

    const openModal = () => {
        setModalNombre(nombre);
        setModalApellido(apellido);
        setModalTelefono(telefono);
        setModalDireccion(direccion);
        setIsModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Datos del perfil</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Nombre:</Text>
                    <Input
                        placeHolder="Nombre:"
                        setValor={nombre}
                        setTextChange={setNombre}
                        setEditable={false} // No editable en vista principal
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Apellido:</Text>
                    <Input
                        placeHolder="Apellido:"
                        setValor={apellido}
                        setTextChange={setApellido}
                        setEditable={false} // No editable en vista principal
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>DUI:</Text>
                    <Input
                        placeHolder="DUI:"
                        setValor={dui}
                        setTextChange={setDui}
                        setEditable={false} // No editable en vista principal
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Correo:</Text>
                    <Input
                        placeHolder="Correo electrónico:"
                        setValor={correo}
                        setTextChange={setCorreo}
                        setEditable={false} // No editable en vista principal
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Teléfono:</Text>
                    <MaskedInputTelefono
                        placeHolder='Teléfono:'
                        telefono={telefono}
                        setTelefono={setTelefono}
                        setEditable={false} // No editable en vista principal
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Dirección:</Text>
                    <InputDireccion
                        placeHolder='Dirección:'
                        direccion={direccion}
                        setDireccion={setDireccion}
                        setEditable={false} // No editable en vista principal
                    />
                </View>
                <Boton4
                    textoBoton='Editar Usuario'
                    accionBoton={openModal} // Abre el modal
                />
                <Boton3
                    textoBoton='Cerrar Sesión'
                    accionBoton={handleLogout}
                />
            </ScrollView>

            {/* Modal para confirmar la edición */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirmar Edición</Text>
                        <Text style={styles.modalMessage}>
                            ¿Estás seguro de que deseas actualizar los datos del perfil?
                        </Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Nombre:</Text>
                            <Input
                                placeHolder="Nombre(s):"
                                setValor={modalNombre}
                                setTextChange={setModalNombre}
                                setEditable={true} // Editable en el modal
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Apellido:</Text>
                            <Input
                                placeHolder="Apellido(s):"
                                setValor={modalApellido}
                                setTextChange={setModalApellido}
                                setEditable={true} // Editable en el modal
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Teléfono:</Text>
                            <MaskedInputTelefono
                                placeHolder='Teléfono:'
                                telefono={modalTelefono}
                                setTelefono={setModalTelefono}
                                setEditable={true} // Editable en el modal
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>Dirección:</Text>
                            <InputDireccion
                                placeHolder='Dirección:'
                                direccion={modalDireccion}
                                setDireccion={setModalDireccion}
                                setEditable={true} // Editable en el modal
                            />
                        </View>
                        <View style={styles.modalButtons}>
                            <Button
                                title="Cancelar"
                                onPress={() => setIsModalVisible(false)}
                            />
                            <Button
                                title="Confirmar"
                                onPress={editProfile}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8FC2BB',
    },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        marginTop: 120,
        marginBottom: 15,
        color: '#FFF',
        fontWeight: 'white',
        fontSize: 22
    },
    title: {
        marginTop: 10,
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semi-transparente
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
