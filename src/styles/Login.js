import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loginTitle:{
        fontSize: 32,
        color: '#191d24',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
    },
    
    formArea: {
        backgroundColor: '#ebebeb',
        flex: 1,
        justifyContent: 'flex-start',
        padding: '8%',
        width: 350,
        marginTop: 50
    },

    inputEmail: { marginTop: 20 },

    loginBtn: {
        marginTop: 30,
        backgroundColor: '#5388d0'
    },

    forgotPassArea: { flexDirection: 'row', marginTop: 30, },

    forgotPassText: {
        color: '#203f78',
        fontFamily: 'sans-serif',
    },

    closeBtnArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 200,
        opacity: .8,
    },

    closeBtn: {
        borderColor: '#191d24',
        borderWidth: 5,
        borderRadius: 100,
        padding: 3,
        width: 42,
    },

    closeIcon: {
        textAlign: 'center',
    },

    checkBoxGenre: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },

    alertErrorArea: {
        backgroundColor: 'transparent',
    },

    teste: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 10,
    },

});

export default styles;