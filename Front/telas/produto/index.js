import {
    Alert, Text, TextInput, TouchableOpacity, View, ScrollView,
    ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import api from '../../service/api';
import Cardproduto from '../../componentes/Cardproduto/index';
import Header from '../../componentes/Header';
import * as Utils from '../../utils/utils';
import Footer from '../../componentes/Footer';
import { Picker } from '@react-native-picker/picker'

export default function Listaprodutos({ navigation }) {

    const [lista, setLista] = useState([]);
    const [listaFiltered, setListaFiltered] = useState([]);
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState([]);
    const [order, setOrder] = useState([]);
    const [stock, setStock] = useState([]);

    async function processEffect() {
        if (load) {
            await carregaLista();
        }
    }

    useEffect(
        () => {
            processEffect(); //necessário método pois aqui não pode utilizar await...
        }, [load]);

    async function carregaLista() {
        try {
            setLoad(true);
            let resposta = (await api.get('/storageControll/product'));
            setStatus([true, false, "Todos"]);
            Utils.sleep(2000);
            setListaFiltered(resposta.data);
            setLista(resposta.data);
            setLoad(false);

            let hasAlert = lista.some(item => item.stockquantity <= item.minstock);
            if (hasAlert) {
                lista.filter(item => item.stockquantity <= item.minstock).map(x => Alert.alert('Atenção', 'Itens abaixo do minimo: ' + x.description));
            }

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    useEffect(
        () => {
            carregaLista(); //necessário método pois aqui não pode utilizar await...
        }, []);

    function novoRegistro() {
        navigation.navigate('Cadastroproduto', {
            inclusao: true,
        });
    }

    async function editaRegistro(produto) {
        navigation.navigate('Cadastroproduto', {
            produto, inclusao: false
        });
    }

    function removerElemento(id) {
        Alert.alert('Atenção', 'Confirma a remoção do produto?',
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
            api.delete('/storageControll/product/' + id).
                then(() => { carregaLista() });
        } catch (e) {
            Alert.alert(e.toString());
        }
    }
    function filterStatus(itemValue) {
        setStatus(itemValue);

        if (itemValue != 'Todos') {
            setListaFiltered(lista.filter(item => item.active == itemValue).map(x => x));
        }
        else {
            setListaFiltered(lista);
        }
    }

    function filterStock(itemValue) {
        setStock(itemValue);

        if (itemValue != 'Todos') {
            setListaFiltered(lista.filter(item => item.stockquantity <= item.minstock).map(x => x));
        }
        else {
            setListaFiltered(lista);
        }
    }

    const filterOrder = (param) => {
        setOrder(param);

        let newList = [...listaFiltered];
        newList.sort((a, b) => (a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0));
        setListaFiltered(newList);
    };

    return (
        <View style={styles.container}>
            <Header metodoAdd={novoRegistro} exibeIconeNovoRegistro={true} novoRegistro={true} txtHeader={'Cadastro de Produtos'} />

            <ScrollView style={styles.areaScroolView}>
                <Text >Status</Text>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue, itemIndex) => filterStatus(itemValue)}
                    dropdownIconColor={'#038a27'}
                    prompt='Selecione o status...'>

                    <Picker.Item label="Todos" value="Todos" key="Todos" />
                    <Picker.Item label="Ativo" value={true} key="Ativo" />
                    <Picker.Item label="Inativo" value={false} key="Inativo" />

                </Picker>

                <Text >Ordenar</Text>
                <Picker
                    selectedValue={order}
                    onValueChange={(itemValue, itemIndex) => filterOrder(itemValue)}
                    dropdownIconColor={'#038a27'}
                    prompt='Ordenar Por...'>

                    <Picker.Item label="Código, decrescente" value="code" key="code" />
                    <Picker.Item label="Descrição, alfabética" value="description" key="description" />
                    <Picker.Item label="Quantidade, decrescente" value="stockquantity" key="stockquantity" />

                </Picker>
                <Text >Estoque</Text>
                <Picker
                    selectedValue={stock}
                    onValueChange={(itemValue, itemIndex) => filterStock(itemValue)}
                    dropdownIconColor={'#038a27'}
                    prompt='Quantidade no estoque inferior ou igual ao mínimo'>

                    <Picker.Item label="Todos" value="Todos" key="Todos" />
                    <Picker.Item label="Verificar" value={true} key="Verificar" />

                </Picker>
                {
                    //load
                    //   ?
                    //<ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
                    // :
                    listaFiltered.map((produto, index) => (
                        <Cardproduto key={index.toString()} produto={produto} editar={editaRegistro} remover={removerElemento} />
                    )
                    )
                }
            </ScrollView >
            <Footer navigation={navigation}></Footer>
        </View>
    );
}