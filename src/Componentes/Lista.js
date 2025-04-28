import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image,TouchableOpacity } from 'react-native';
import { StyleSheet, View, Text, ScrollView, Image, TextInput } from
'react-native';
import Filtro from './Filtro';
import { useNavigation } from '@react-navigation/native';

export default function Lista(){
const [data, setData] = useState([]);
const [busqueda, setBusqueda] = useState('');
const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
const navigation = useNavigation();

useEffect(() => {
    const obtenerDatos = async () => {
    if (tipoSeleccionado === 'All') {
    const res = await
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
    const json = await res.json();
    setData(json.results);
    } else {
    const res = await
    fetch(`https://pokeapi.co/api/v2/type/${tipoSeleccionado}`);
    const json = await res.json();
    const listaFiltrada = json.pokemon.map(p => p.pokemon);
    setData(listaFiltrada);
    const handleTipoChange = (tipo) => {
        setTipoSeleccionado(tipo);
        };
    }
    };
    obtenerDatos();
    }, [tipoSeleccionado]);

return(
<TouchableOpacity
key={index}
style={styles.item}
onPress={() => navigation.navigate('Pokemon', { nombre: nombre
})} // Redirige con nombre como parámetro
>
<Text>{pokemon.url.split("/")[6]} {index}</Text>
<Image
source={{ uri:
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokem
on/other/official-artwork/${pokemon.url.split("/")[6]}.png` }}
style={styles.imagen}
/>
<Text>{pokemon.name}</Text>
</TouchableOpacity>
);
}

const styles = StyleSheet.create({
    lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between', // para distribuir en 2 columnas
    padding: 10,
    },
    item: {
    backgroundColor: 'aliceblue',
    width: '48%', // equivalente a calc(50% - 5px)
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    },
    imagen: {
    width: 100,
    
    height: 100,
    resizeMode: 'contain',
    }
    });
