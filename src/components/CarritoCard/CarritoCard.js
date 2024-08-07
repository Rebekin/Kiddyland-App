import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes'

const CarritoCard = ({ item, accionBotonDetalle, updateDataDetalleCarrito }) => {

    const ip = Constantes.IP;
    //asignar el valor a cantidad producto carrito que viene 

    const handleDeleteDetalleCarrito = async (idDetalle) => {
        try {
            // Mostrar un mensaje de confirmación antes de eliminar
            Alert.alert(
                'Confirmación',
                '¿Estás seguro de que deseas eliminar este elemento del carrito?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Eliminar',
                        onPress: async () => {
                            const formData = new FormData();
                            formData.append('idDetalle', idDetalle);
                            const response = await fetch(`${ip}/P-Z/api/services/public/pedido.php?action=deleteDetail`, {
                                method: 'POST',
                                body: formData
                            });

                            const data = await response.json();
                            if (data.status) {
                                Alert.alert('Datos eliminados correctamente del carrito');
                                
                                // Llamar a la función de actualización para actualizar la lista
                                updateDataDetalleCarrito(prevData => prevData.filter(item => item.id_detalle !== idDetalle));
                            } 
                            
                            else {
                                Alert.alert('Error al eliminar del carrito', data.error);
                            }
                        }
                    }
                ]
            );
        } 
        
        catch (error) {
            Alert.alert("Error al eliminar del carrito")
        }
    };

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Identificador del detalle: <Text style={styles.textDentro}>{item.id_detalle}</Text></Text>
            <Text style={styles.itemText}>Nombre: <Text style={styles.textDentro}>{item.nombre_producto}</Text></Text>
            <Text style={styles.itemText}>Precio: <Text style={styles.textDentro}>${item.precio_producto}</Text></Text>
            <Text style={styles.itemText}>Color: <Text style={styles.textDentro}>{item.nombre_color}</Text></Text>
            <Text style={styles.itemText}>Talla: <Text style={styles.textDentro}>{item.numero_talla}</Text></Text>
            <Text style={styles.itemText}>Cantidad: <Text style={styles.textDentro}>{item.cantidad_producto}</Text></Text>
            <Text style={styles.itemText}>SubTotal: <Text style={styles.textDentro}>${(parseFloat(item.cantidad_producto) 
                * parseFloat(item.precio_producto)).toFixed(2)}</Text></Text>
            <TouchableOpacity style={styles.modifyButton}
                onPress={() => accionBotonDetalle(item.id_detalle, item.cantidad_producto)}
            >
                <Text style={styles.buttonText}>Modificar Cantidad</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton}
                onPress={() => handleDeleteDetalleCarrito(item.id_detalle)}
            >
                <Text style={styles.buttonText}>Eliminar del carrito</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CarritoCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E', // Brown color for the title
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 8, 
        fontWeight: '700'
    },
    textDentro: {
        fontWeight: '400'
    },
    modifyButton: {
        borderWidth: 1,
        borderColor: '#3C38B0',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#3C38B0', // Light brown color for modify button
        marginVertical: 4,
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: '#B00002',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#B00002', // Darker orange color for delete button
        marginVertical: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    finalButton: {
        backgroundColor: '#A0522D', // Sienna color for final action buttons
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    finalButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerButtons: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});