import {
    Text, TouchableOpacity, View
} from 'react-native';
import styles from './styles'
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function Cardcategoria({ categoria, remover, editar }) {

    return (
        <View style={styles.areaCard} >

            <Text style={styles.areaNome} >{categoria.code} - {categoria.description}  </Text>

            <View style={styles.areaBotoesAcao}>
                <TouchableOpacity onPress={() => remover(categoria._id)}>
                    <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(categoria)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};