import { StyleSheet, Text, View, Alert, ScrollView, Modal } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes';
// Import de componentes
import Input from '../components/Inputs/Input';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import InputDireccion from '../components/Inputs/InputDireccion';
import ButtonBlanco from '../components/Buttons/ButtonBlanco';
import ButtonCafe from '../components/Buttons/ButtonCafe';
import ButtonPrimero from '../components/Buttons/ButtonPrimero';
import ButtonSecundario from '../components/Buttons/ButtonSecundario';
import ButtonTurquesaClaro from '../components/Buttons/ButtonTurquesaClaro';

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

    // Función para llenar los inputs con los datos del usuario
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

    // Lógica para cargar los datos del usuario al cargar la pantalla
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
                <ButtonSecundario
                    textoBoton='Editar Usuario'
                    accionBoton={openModal} // Abre el modal
                />
                <ButtonBlanco
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
                        <ButtonPrimero
                            textoBoton='Confirmar'
                            accionBoton={editProfile}
                        />
                        <ButtonCafe
                            textoBoton='Cancelar'
                            accionBoton={() => setIsModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    texto: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    scrollViewStyle: {
        paddingBottom: 40,
    },
    inputContainer: {
        marginBottom: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});
