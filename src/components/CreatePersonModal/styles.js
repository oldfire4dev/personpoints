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

    checkBoxGenre: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 20,

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

    createPersonButton: {
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

    cartoonPicker: {
        flexDirection: 'row',
        marginTop: 10,
    },

    cartoonImg: {
        marginLeft: 6,
    },

    selectedImageArea: {
        marginTop: 20,
        alignItems: 'center',
    },

    selectedImage: {
        flexDirection: 'column',
    },

})

export default styles;