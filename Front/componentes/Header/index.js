import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';

export default function Header({ metodoAdd, exibeIconeNovoRegistro, txtHeader }) {
    return (
        <View style={styles.containerHeader}>
            <Text style={styles.tituloHeader}>{txtHeader}</Text>
            {
                exibeIconeNovoRegistro &&
                <TouchableOpacity style={styles.botaoAdd} onPress={() => metodoAdd()}>
                    <Text style={styles.cirtuloBotao}>
                        ➕
                    </Text>
                </TouchableOpacity>
            }
        </View>
    );
}