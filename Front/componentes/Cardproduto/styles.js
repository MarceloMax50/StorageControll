import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    areaCard: {     
        
        flexDirection: 'row',
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10,        
        paddingHorizontal:8,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    feminino: {
        backgroundColor: '#fc97cd',
    },
    masculino:{
        backgroundColor: '#50a4f2',
    },

    areaNome: {
        width: '60%',
        flexDirection: 'row',
        fontSize: 18,
        fontWeight: 'bold',
    },
    areaData: {
        width: '30%',
        fontSize: 18,        
    },


    areaBotoesAcao: {
        width: '10%',
    },
});


export default styles;