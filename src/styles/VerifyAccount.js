import { StyleSheet } from 'react-native';

const VerifyAccountStyles = StyleSheet.create({
    notVerifiedText: {
        fontFamily: 'sans-serif',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    img: {
        width: 456,
        height: 456,
    },

    explainingArea:{
        marginTop: 10,
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