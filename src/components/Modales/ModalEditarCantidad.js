import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import Boton3 from '../../components/Buttons/Button3';
import Boton5 from '../../components/Buttons/Button5';
import * as Constantes from '../../utils/constantes';

const ModalEditarCantidad = ({ setModalVisible, modalVisible, idDetalle, setCantidadProductoCarrito, cantidadProductoCarrito, getDetalleCarrito }) => {

    const ip = Constantes.IP;

    const handleUpdateDetalleCarrito = async () => {
        try {
            if (cantidadProductoCarrito <= 0) {
                Alert.alert("La cantidad no puede ser igual o menor a 0");
                return;
            }

            const formData = new FormData();
            formData.append('idDetalle', idDetalle);
            formData.append('cantidadProducto', cantidadProductoCarrito);

            const response = await fetch(`${ip}/Kiddyland/api/services/public/pedido.php?action=updateDetail`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Se actualizo el detalle del producto');
                getDetalleCarrito();
            } 
            
            else {
                Alert.alert('Error al editar detalle carrito', data.error);
            }
            setModalVisible(false);
        } 
        
        catch (error) {
            Alert.alert("Error en editar carrito", error);
            setModalVisible(false);
        }
    };

    const handleCancelEditarCarrito = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Cantidad actual: {cantidadProductoCarrito}</Text>
                    <Text style={styles.modalText}>Nueva cantidad:</Text>
                    <TextInput
                        style={styles.input}
                        value={cantidadProductoCarrito}
                        onChangeText={setCantidadProductoCarrito}
                        keyboardType="numeric"
                        placeholder="Ingrese la cantidad"
                    />
                    <Boton5
                        textoBoton='Editar cantidad'
                        accionBoton={handleUpdateDetalleCarrito}
                    />
                    <Boton3
                        textoBoton='Cancelar'
                        accionBoton={handleCancelEditarCarrito}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ModalEditarCantidad;

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
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});