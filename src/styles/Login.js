import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

let responsiveHeight;


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


    
    

    modalForgetPasswordStyle: {
        width: width * 4/5,
        padding: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#5388d0',
    },

    titleArea: {
        alignItems: 'center',
        marginBottom: 20,
    },

    titleText: {
        fontSize: 22,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },

    closeModalArea: {
        position: 'relative',
    },

    closeModalButton: {
        position: 'absolute',
        backgroundColor: '#5388d0',
        borderRadius: 75,
        padding: 5,
        width: 50,
        alignItems: 'center',
        right: 47,
    },

    createTaskButton: {
        position: 'absolute',
        backgroundColor: '#5388d0',
        borderRadius: 75,
        padding: 5,
        width: 50,
        alignItems: 'center',
        right: -7,
    },

    createDisabled: {
        position: 'absolute',
        backgroundColor: '#496387',
        borderRadius: 75,
        padding: 5,
        width: 50,
        alignItems: 'center',
        right: -7,
    },

});

export default styles;