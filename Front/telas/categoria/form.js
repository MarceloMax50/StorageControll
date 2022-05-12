import {
  Alert, Text, TextInput, TouchableOpacity, View, ScrollView,
  ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import Header from '../../componentes/Header';
import api from '../../service/api';
export default function Cadastrocategoria({ navigation }) {

  let props = navigation.state.params;
  let inclusao = props.inclusao;
  let categoria = props.categoria;

  const [code, setCode] = useState(categoria && categoria.code && categoria.code.toString());
  const [description, setDescription] = useState(categoria && categoria.description);
  const [load, setLoad] = useState(false);

  useEffect(
    () => {
      carregamentosUseEffect();
    }, []
  );

  async function carregamentosUseEffect() {
    setLoad(true);
    setLoad(false);
  }

  async function salva() {
    let objcategoria = {
      code,
      description,
    };

    if (inclusao) {
      await api.post('/storageControll/Category', objcategoria)
        .then(() => navigation.navigate('Listacategorias'))
        .catch(error => trataErroAPI(error));
    }
    else {
      console.log('Atualizando objeto', objcategoria);
      await api.delete('/storageControll/Category/' + categoria._id)
        .then(() => console.log('Deletado'))
        .catch(error => trataErroAPI(error));
      await api.post('/storageControll/Category', objcategoria)
        .then(() => navigation.navigate('Listacategorias'))
        .catch(error => trataErroAPI(error));
    }
  }

  function trataErroAPI(error) {
    if (error.response && error.response.data && error.response.data.erro) {
      Alert.alert(JSON.stringify(error));
    }
    else {
      Alert.alert(JSON.stringify(error));
    }
  }

  return (
    <View style={styles.container}>
      <Header exibeIconeNovoRegistro={false} txtHeader={'Formulario de categoria'} />
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

            <View style={styles.areaBotoes}>
              <TouchableOpacity style={styles.botaoCancela} onPress={() => navigation.navigate('Listacategorias')}>
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