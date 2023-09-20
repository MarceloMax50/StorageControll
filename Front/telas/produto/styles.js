import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: StatusBar.currentHeight,
    },
    areaScroolView: {
        width: '95%',
    },

    areaScroolViewForm: {
        width: '95%',
    },
    labelCampoEdicao: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#038a27',
    },
    caixaTexto: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#038a27',
        height: 35,
        width: '100%',
        marginBottom: 20,
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
    botaoCancela: {
        width: '30%',
        height: 50,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5ad42',
    },

    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30,
        marginBottom: 30,
    },
    textoBotao: {
        color: '#FFF',
        fontSize: 20,
    },
    caixaSexo: {
        height: 35,
        width: '100%',
        marginBottom: 20,
    },
    masculino: {
        fontSize: 20,
        color: 'blue',
    },
    feminino: {
        fontSize: 20,
        color: '#f78dcd',
    },
    cidade: {
        fontSize: 20,
    },
    waiting: {
        marginTop: 100,
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 60,
        alignItems: 'center',
        borderBottomColor: '#000',
    },

});


export default styles;