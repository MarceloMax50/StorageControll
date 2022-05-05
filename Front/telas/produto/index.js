import {
    Alert, View, ScrollView, ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import api from '../../service/api';
import Cardproduto from '../../componentes/Cardproduto/index';
import Header from '../../componentes/Header';
import * as Utils from '../../utils/utils';

export default function Listaprodutos({ navigation }) {

    const [lista, setLista] = useState([]);
    const [load, setLoad] = useState(false);

    async function carregaLista() {
        try {
            setLoad(true);
            let resposta = (await api.get('/storageControll/product'));
            Utils.sleep(2000);
            setLista(resposta.data);
            setLoad(false);

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    useEffect(
        () => {
            console.log('executando useffect da listagem');
            carregaLista(); //necessário método pois aqui não pode utilizar await...
        }, []);

    function novoRegistro() {
        navigation.navigate('Cadastroproduto', {
            inclusao: true,
        });
    }

    async function editaRegistro(produto) {
        console.log(produto);

        navigation.navigate('Cadastroproduto', {
            produto, inclusao: false
        });
    }

    function removerElemento(id) {
        Alert.alert('Atenção', 'Confirma a remoção do contato?',
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
        console.log('O ID: ' + id);

        try {
            api.delete('/storageControll/product/' + id).
                then(() => { carregaLista() });
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <Header metodoAdd={novoRegistro} exibeIconeNovoRegistro={true} novoRegistro={true} txtHeader={'Cadastro de Produtos'} />
            <ScrollView style={styles.areaScroolView}>
                {
                    load
                        ?
                        <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
                        :
                        lista.map((produto, index) => (
                            <Cardproduto key={index.toString()} produto={produto} editar={editaRegistro} remover={removerElemento} />
                        )
                        )
                }
            </ScrollView >
        </View>
    );
}