import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import Boton3 from '../../components/Buttons/Button3';
import Boton5 from '../../components/Buttons/Button5';
import * as Constantes from '../../utils/constantes';

const ModalCompra = ({ visible, cerrarModal, nombreProductoModal, idProductoModal, cantidad, setCantidad }) => {
    const ip = Constantes.IP;

    const handleCreateDetail = async () => {
        if (!cantidad || cantidad <= 0 || isNaN(cantidad)) {
            Alert.alert("Error", "La cantidad debe ser un número mayor a 0.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('idProducto', idProductoModal);
            formData.append('cantidadProducto', cantidad.toString());

            const response = await fetch(`${ip}/Kiddyland/api/services/public/pedido.php?action=createDetail`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log("data despues del response", data);

            if (data.status) {
                Alert.alert('Éxito', 'Datos guardados correctamente.');
                cerrarModal(false);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al crear el detalle.');
        }
    };

    const handleCancelCarrito = () => {
        cerrarModal(false);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => cerrarModal(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{nombreProductoModal}</Text>
                    <Text style={styles.modalText}>Cantidad:</Text>
                    <TextInput
                        style={styles.input}
                        value={cantidad}
                        onChangeText={text => setCantidad(text)}
                        keyboardType="numeric"
                        placeholder="Ingrese la cantidad"
                    />
                    <View style={styles.buttonContainer}>
                        <Boton5
                            textoBoton='Agregar al carrito'
                            accionBoton={handleCreateDetail}
                        />
                        <Boton3
                            textoBoton='Cancelar'
                            accionBoton={handleCancelCarrito}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: 200,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default ModalCompra;
