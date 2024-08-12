import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5} from '@expo/vector-icons'; // Importa MaterialCommunityIcons y MaterialIcons
import { Platform } from 'react-native';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Productos';
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';
import UpdateUser from '../screens/UpdateUser';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Oculta el header
                tabBarActiveTintColor: '#60BFB2', // Color de los íconos activos
                tabBarInactiveTintColor: '#808080', // Color de los íconos inactivos
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#FFF',
                    height: Platform.OS === 'ios' ? 80 : 70, // Estilo de la barra de pestañas, altura diferente para iOS y Android
                }, // Estilo de la barra de pestañas
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-heart';
                        return <MaterialCommunityIcons name={iconName} color={color} size={35} />;
                    } else if (route.name === 'Productos') {
                        iconName = 'toys';
                        return <MaterialIcons name={iconName} color={color} size={30} />;
                    } else if (route.name === 'Carrito') {
                        return <FontAwesome5 name="shopping-basket" color={color} size={size} />;
                    } else if (route.name === 'Perfil') {
                        iconName = 'teddy-bear';
                        return <MaterialCommunityIcons name={iconName} color={color} size={30} />;
                    }
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ title: 'Inicio' }}
            />
            <Tab.Screen
                name="Productos"
                component={Productos}
                options={{ title: 'Productos' }}
            />
            <Tab.Screen
                name="Carrito"
                component={Carrito}
                options={{ title: 'Carrito' }}
            />
            <Tab.Screen
                name="Perfil"
                component={UpdateUser}
                options={{ title: 'Perfil' }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
