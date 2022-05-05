import {
    Text, TouchableOpacity, View
} from 'react-native';
import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { format } from 'date-fns';

export default function Cardproduto({ produto, remover, editar }) {

    return (
        <View style={styles.areaCard} >

            <Text style={styles.areaNome} >{produto.code} - {produto.description}  </Text>

            <View style={styles.areaBotoesAcao}>
                <TouchableOpacity onPress={() => remover(produto._id)}>
                    <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(produto)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};