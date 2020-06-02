import { StyleSheet } from 'react-native';

const VerifyAccountStyles = StyleSheet.create({
    app: {
        flex: 1,
        alignItems: 'center',
    },

    notVerifiedText: {
        fontFamily: 'sans-serif',
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 20,
    },

    img: {
        width: 256,
        height: 256,
    },

    explainingArea:{
        marginTop: 30,
        padding: 15,
        marginHorizontal: 10,
        backgroundColor: '#ebebeb',
    },

    helloText: {
        fontFamily: 'sans-serif',
        fontSize: 22,
        color: '#333333',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    explainingText: {
        fontFamily: 'sans-serif',
        fontSize: 19,
        color: '#333333',
        textAlign: 'center',
    },

    clickHereText:{
        fontFamily: 'sans-serif',
        color: '#203f78',
        fontSize: 20,
    },

    verifiedBtn: {
        marginTop: 20,
        backgroundColor: '#5388d0',
        width: 165,
        height: 50,
    },

});

export default VerifyAccountStyles;