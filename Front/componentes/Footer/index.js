import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';

export default function Footer({ navigation }) {

    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Listaprodutos')}>
                <Text style={styles.textoBotao}> Produtos </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Listaprodutos')}>
                <Text style={styles.textoBotao}> Categorias </Text>
            </TouchableOpacity>
        </View>
    );
}