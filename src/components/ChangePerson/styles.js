import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    titleArea: {
        alignItems: 'center',
        marginBottom: 20,
    },

    titleText: {
        fontSize: 22,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },

    listPersons: {
        flexDirection: 'column',
    },

    addPersonButton: {
        flexDirection: 'row',
    },

    removePersonButton: {
        position: 'absolute',
        right: 0,
    },

})

export default styles;