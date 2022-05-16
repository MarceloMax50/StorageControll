import {
    Alert, View, ScrollView, ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import api from '../../service/api';
import Cardcategoria from '../../componentes/Cardcategoria/index';
import Header from '../../componentes/Header';
import * as Utils from '../../utils/utils';
import Footer from '../../componentes/Footer';

export default function Listacategorias({ navigation }) {

    const [lista, setLista] = useState([]);
    const [load, setLoad] = useState(false);

    async function carregaLista() {
        try {
            setLoad(true);
            let resposta = (await api.get('/storageControll/Category'));
            Utils.sleep(2000);
            setLista(resposta.data);
            setLoad(false);

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    useEffect(
        () => {
            carregaLista();
        }, []);

    function novoRegistro() {
        navigation.navigate('Cadastrocategoria', {
            inclusao: true,
        });
    }

    async function editaRegistro(categoria) {
        navigation.navigate('Cadastrocategoria', {
            categoria, inclusao: false
        });
    }

    function removerElemento(id) {
        Alert.alert('Atenção', 'Confirma a remoção da categoria?',
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaRemocao(id),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ]);
    }

    async function efetivaRemocao(id) {
        try {
            api.delete('/storageControll/Category/' + id).
                then(() => { carregaLista() });
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <Header metodoAdd={novoRegistro} exibeIconeNovoRegistro={true} novoRegistro={true} txtHeader={'Cadastro de Categorias'} />
            <ScrollView style={styles.areaScroolView}>
                {
                    load
                        ?
                        <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
                        :
                        lista.map((categoria, index) => (
                            <Cardcategoria key={index.toString()} categoria={categoria} editar={editaRegistro} remover={removerElemento} />
                        )
                        )
                }
            </ScrollView >
            <Footer navigation={navigation}></Footer>
        </View>
    );
}