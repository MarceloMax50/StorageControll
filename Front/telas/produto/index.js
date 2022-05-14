import {
    Alert, Text, View, ScrollView, ActivityIndicator
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


    async function processEffect() {
        if (load) {
            console.log("Carregando dados...");
            await carregaLista();
        }
    }

    useEffect(
        () => {
            console.log('executando useffect da listagem');
            processEffect(); //necessário método pois aqui não pode utilizar await...
        }, [load]);

    async function carregaLista() {
        try {
            setLoad(true);
            let resposta = (await api.get('/storageControll/product'));
            setStatus([true, false, "Todos"]);
            Utils.sleep(2000);
            console.log("Status: " + status);
            console.log(resposta);
            setListaFiltered(resposta.data);
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
        console.log('O ID: ' + id);

        try {
            api.delete('/storageControll/product/' + id).
                then(() => { carregaLista() });
        } catch (e) {
            Alert.alert(e.toString());
        }
    }
    function filterStatus(itemValue) {
        console.log('Status: ' + itemValue)
        if (itemValue != 'Todos') {
            setStatus(itemValue);
            setListaFiltered(lista.filter(item => item.active == itemValue).map(x => x));
            console.log('Status1 comparação: ' + itemValue + " = " + JSON.stringify(listaFiltered[0]));
        }
        else {
            setListaFiltered(lista);
            console.log('Status2: ' + itemValue)
        }
        console.log('Status3: ' + itemValue)
        setLoad(true);
    }

    const handleOrderClick = (param) => {
        let newList = [...listaFiltered];
        console.log(newList)
        newList.sort((a, b) => (a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0));
        console.log(newList)
        setListaFiltered(newList);
    };

    return (
        <View style={styles.container}>
            <Header metodoAdd={novoRegistro} exibeIconeNovoRegistro={true} novoRegistro={true} txtHeader={'Cadastro de Produtos'} />

            <View style={styles.filter}>
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

                <Text >Ordenar por:</Text>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue, itemIndex) => handleOrderClick(itemValue)}
                    dropdownIconColor={'#038a27'}
                    prompt='Ordenar Por...'>

                    <Picker.Item label="Código" value="code" key="code" />
                    <Picker.Item label="Descrição " value="description" key="description" />
                    <Picker.Item label="Quantidade no estoque" value="stockquantity" key="stockquantity" />

                </Picker>
            </View>

            <ScrollView style={styles.areaScroolView}>
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