import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono

export default function ProductoCard({
    ip,
    imagen_producto,
    nombre_producto,
    descripcion_producto,
    precio_producto,
    existencias_producto,
    accionBotonProducto,
    id_producto
}) {
    return (
        <View key={id_producto} style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: `${ip}/Kiddyland/api/images/productos/${imagen_producto}` }}
                    style={styles.image}
                    resizeMode="contain" // Ajustar la imagen al contenedor
                />
            </View>
            <Text style={styles.textTitle}>{nombre_producto}</Text>
            <Text style={styles.text}>{descripcion_producto}</Text>
            <Text style={styles.textTitle}>
                Precio: <Text style={styles.textDentro}>${precio_producto}</Text>
            </Text>
            <Text style={styles.textTitle}>
                Existencias:{" "}
                <Text style={styles.textDentro}>
                    {existencias_producto} {existencias_producto === 1 ? "Unidad" : "Unidades"}
                </Text>
            </Text>
            <TouchableOpacity style={styles.cartButton} onPress={accionBotonProducto}>
                <FontAwesome name="plus-circle" size={24} color="white" />
                <Text style={styles.cartButtonText}>Seleccionar Producto</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerFlat: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 1,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    textTitle: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '700',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginLeft: 8,
    },
    image: {
        width: '65%',
        height: 150,
        borderRadius: 8,
        marginBottom: 12,
    },
    imageContainer: {
        alignItems: 'center', // Centrar imagen horizontalmente
    },
    textDentro: {
        fontWeight: '400',
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3C38B0',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    cartButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
        textAlign: 'center',
    },
});
