import {
  Alert, Text, TextInput, TouchableOpacity, View, ScrollView,
  ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import Header from '../../componentes/Header';
import DateTimeInput from '../../componentes/DateTimeInput';
import api from '../../service/api';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker'
import * as Utils from '../../utils/utils';

export default function Cadastroproduto({ navigation }) {

  let props = navigation.state.params;
  let inclusao = props.inclusao;
  let produto = props.produto;

  const [code, setCode] = useState(produto && produto.code && produto.code.toString());
  const [description, setDescription] = useState(produto && produto.description);
  const [stockquantity, setStockquantity] = useState(produto && produto.stockquantity && produto.stockquantity.toString());
  const [minstock, setMinstock] = useState(produto && produto.minstock && produto.minstock.toString());
  const [active, setActive] = useState((produto && produto.active != undefined && produto.active.toString()) || '');
  const [category, setCategory] = useState(produto && produto.CidadeId);
  const [categorys, setCategorys] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(
    () => {
      carregamentosUseEffect();
    }, []
  );

  async function carregamentosUseEffect() {
    setLoad(true);
    //  await carregaCategorys();
    setLoad(false);
  }

  async function carregaCategorys() {
    try {
      if (categorys.length == 0) {
        let resposta = await api.get('/storageControll/category');
        setCategorys(resposta.data);
      }
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function salva() {
    let objproduto = {
      code,
      description,
      active,
      stockquantity,
      minstock,
      category,
    };

    if (inclusao) {
      await api.post('/storageControll/product', objproduto)
        .then(() => navigation.navigate('Listaprodutos'))
        .catch(error => trataErroAPI(error));
    }
    else {
      console.log('Atualizando objeto', objproduto);
      await api.delete('/storageControll/product/' + produto._id)
        .then(() => console.log('Deletado'))
        .catch(error => trataErroAPI(error));
      await api.post('/storageControll/product', objproduto)
        .then(() => navigation.navigate('Listaprodutos'))
        .catch(error => trataErroAPI(error));
    }
  }

  function trataErroAPI(error) {
    if (error.response && error.response.data && error.response.data.erro) {
      Alert.alert(error.response.data.erro);
    }
    else {
      Alert.alert(error.toString());
    }
  }

  return (
    <View style={styles.container}>
      <Header exibeIconeNovoRegistro={false} txtHeader={'Formulario de Produto'} />
      {
        load
          ?
          <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
          :
          <ScrollView style={styles.areaScroolViewForm}>

            <Text style={styles.labelCampoEdicao}>Nome</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setDescription(texto)}
              value={description} />

            <Text style={styles.labelCampoEdicao}>Quantidade</Text>
            <TextInput style={styles.caixaTexto}
              keyboardType='numeric'
              onChangeText={(texto) => setStockquantity(texto)}
              value={stockquantity} />

            <Text style={styles.labelCampoEdicao}>Minimo</Text>
            <TextInput style={styles.caixaTexto}
              keyboardType='numeric'
              onChangeText={(texto) => setMinstock(texto)}
              value={minstock} />

            <Text style={styles.labelCampoEdicao}>Ativo</Text>
            <Picker
              selectedValue={active}
              onValueChange={(itemValue, itemIndex) => setActive(itemValue)}
              dropdownIconColor={'#038a27'}
              prompt='Selecione o active...'

            >
              <Picker.Item label="" value="" enabled={false} />
              <Picker.Item label="Sim" value="true" style={styles.masculino} />
              <Picker.Item label="Não" value="false" style={styles.feminino} />
            </Picker>

            <Text style={styles.labelCampoEdicao}>Cidade</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              dropdownIconColor={'#038a27'}
              prompt='Selecione a cidade...'
            >
              {
                categorys.map((cidade, index) => (
                  <Picker.Item key={index.toString()} label={cidade.description}
                    value={cidade.code} style={styles.cidade} />
                ))
              }

            </Picker>

            <View style={styles.areaBotoes}>
              <TouchableOpacity style={styles.botaoCancela} onPress={() => navigation.navigate('Listaprodutos')}>
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botao} onPress={() => salva()}>
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      }

    </View >
  );
}