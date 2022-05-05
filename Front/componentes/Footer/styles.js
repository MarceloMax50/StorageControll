import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 60,
        backgroundColor: '#6b798f',
        alignItems: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 5,
        marginBottom: 15,
    },
    textoBotao: {
        color: '#FFF',
        fontSize: 20,
    },
    botao: {
        width: '30%',
        height: 50,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040d59',
    },
    tituloHeader: {
        fontSize: 25,
        color: '#FFF',
        marginTop: 10,
    },
    cirtuloBotao: {
        width: 68,
        height: 68,
        backgroundColor: '#FFF',
        borderRadius: 50,
        paddingLeft: 2,
        fontSize: 47
    },
    sizeBotao: {
        fontSize: 45
    },
    botaoAdd: {
        marginTop: 15,

    }
});


export default styles;