import { StyleSheet } from 'react-native';

const MainStyles = StyleSheet.create({
    containerStart: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "column"
    },

    background:{
        position: 'absolute',
        top: 0,
        resizeMode: "cover",
        width: '100%',
    },

    logo: {
        width: 120,
        height: 128,
        marginTop: 10,
    },
    
    sloganText: {
        fontSize: 40,
        color: '#fff',
        marginTop: 40,
        marginLeft: 40,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        letterSpacing: 2,
        width: 270
    },

    btnArea: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 60,
    },

    loginBtn: {
        backgroundColor: '#5388d0',
        width: 180,
        borderRadius: 5,
    },
    
    loginBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },

    signUpArea:{ flexDirection: 'row', marginTop: 20, },
    
    signUpAsk: { fontFamily: 'sans-serif', },

    signUpText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#203f78',
    },

    loginContainer: {
        flex: 1,
        alignItems: 'center',
    },

});

export default MainStyles;
  