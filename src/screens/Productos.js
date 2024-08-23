import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes';
import ProductoCard from '../components/Productos/ProductoCard';
import ModalCompra from '../components/Modales/ModalCompra';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';

export default function Productos({ navigation }) {
    const ip = Constantes.IP;
    const [dataProductos, setDataProductos] = useState([]);
    const [dataCategorias, setDataCategorias] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [idProductoModal, setIdProductoModal] = useState('');
    const [nombreProductoModal, setNombreProductoModal] = useState('');
    const [numColumns, setNumColumns] = useState(2);

    const volverInicio = async () => {
        navigation.navigate('Home');
    };

    const handleCompra = (nombre, id, color, talla) => {
        setModalVisible(true);
        setIdProductoModal(id);
        setNombreProductoModal(nombre);
    };

    const getProductos = async (idCategoriaSelect = 1) => {
        try {
            if (idCategoriaSelect <= 0) {
                return;
            }
            const formData = new FormData();
            formData.append('idCategoria', idCategoriaSelect);

            const response = await fetch(`${ip}/Kiddyland/api/services/public/producto.php?action=readProductosCategoria`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                setDataProductos(data.dataset);
            } else {
                Alert.alert('Error productos', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al listar los productos');
        }
    };

    const getCategorias = async () => {
        try {
            const response = await fetch(`${ip}/Kiddyland/api/services/public/categoria.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataCategorias(data.dataset);
            } else {
                Alert.alert('Error categorias', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las categorias');
        }
    };

    const handleCategoriaChange = (itemValue) => {
        setSelectedValue(itemValue);
        getProductos(itemValue);
    };

    useEffect(() => {
        getProductos();
        getCategorias();
    }, []);

    const irCarrito = () => {
        navigation.navigate('Carrito');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Catálogo de Productos</Text>
            <ModalCompra
                visible={modalVisible}
                cerrarModal={setModalVisible}
                nombreProductoModal={nombreProductoModal}
                idProductoModal={idProductoModal}
                cantidad={cantidad}
                setCantidad={setCantidad}
            />
            <View>
                <Text style={styles.subtitle}>
                    Categoría de productos disponibles
                </Text>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        style={{ inputAndroid: styles.picker }}
                        onValueChange={handleCategoriaChange}
                        placeholder={{ label: 'Selecciona una categoría...', value: null }}
                        items={dataCategorias.map(categoria => ({
                            label: categoria.nombre_categoria,
                            value: categoria.id_categoria,
                        }))}
                    />
                </View>
            </View>
            <SafeAreaView style={styles.containerFlat}>
                <FlatList
                    key={`flatlist-${numColumns}`}
                    data={dataProductos}
                    keyExtractor={(item) => item.id_producto}
                    renderItem={({ item }) => (
                        <ProductoCard
                            ip={ip}
                            imagen_producto={item.imagen_producto}
                            nombre_producto={item.nombre_producto}
                            descripcion_producto={item.descripcion_producto}
                            precio_producto={item.precio_producto}
                            existencias_producto={item.existencias_producto}
                            accionBotonProducto={() => handleCompra(item.nombre_producto, item.id_producto)}
                            id_producto={item.id_producto}
                        />
                    )}
                    numColumns={numColumns}
                    columnWrapperStyle={styles.row}
                />
            </SafeAreaView>
            <TouchableOpacity
                style={styles.cartButton}
                onPress={irCarrito}>
                <FontAwesome name="shopping-cart" size={24} color="white" />
                <Text style={styles.cartButtonText}>Ir al carrito</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerFlat: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 10, // Ajuste para evitar que las tarjetas se sobrepongan
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        backgroundColor: '#60BFB2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 7,
        color: '#fff',
    },
    pickerContainer: {
        borderColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 15, // Añadir espacio debajo del picker
    },
    picker: {
        color: '#000000',
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3C38B0',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    cartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
});
