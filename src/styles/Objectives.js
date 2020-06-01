import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

let responsiveHeight, responsiveHeightInContent;

if(height >= 750) {
    responsiveHeight = height * 0.49;
    responsiveHeightInContent = height * 0.893;
}
else if(height < 750 && height >= 620){
    responsiveHeight = height * 0.43;
    responsiveHeightInContent = height * 0.792;
}
else if(height < 620 && height >= 495) {
    responsiveHeight = height * 0.33;
    responsiveHeightInContent = height * 0.691;
}

const ObjectivesStyles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#e6e6e6',
    },

    headerArea: {
        backgroundColor: '#fff',
        height: 60,
        maxHeight: '100%',
        justifyContent: 'center'
    },

    personArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },

    modalChangePersonStyle: {
        width: width * 3/4,
        padding: 20,
        borderBottomWidth: 7,
        borderBottomColor: '#5388d0',
    },

    modalCreateObjectiveStyle: {
        width: width * 4/5,
        padding: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#5388d0',
    },

    modalObjectiveHistoryStyle: {
        width: width * 4/5,
        padding: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#5388d0',
    },

    noObjectivesFoundArea: {
        alignItems: 'center',
        marginTop: width / 2,
    },

    contentArea:{
        height: responsiveHeightInContent,
    },

    createObjectiveArea: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },

    createObjectiveButton: {
        backgroundColor: '#5388d0',
        padding: 15,
        alignItems: 'center',
    },




    listOfObjectivesArea: {
        width: '100%',
        padding: 15,
    },
    objectiveStyle: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
    },
    objectiveValuePoints:{
        position: 'absolute',
        right: 102,
        flexDirection: 'column',
    },
});

export default ObjectivesStyles;