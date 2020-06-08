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

const SettingsStyles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#fff',
    },

    headerArea: {
        backgroundColor: '#e6e6e6',
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
        maxHeight: '60%',
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

    contentPersonsEmpty: {
        alignItems: 'center',
        marginTop: 120,
    },

    noPersonText: {
        fontSize: 19,
        fontFamily: 'sans-serif',
        fontStyle: 'italic',
        marginTop: 20,
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
    
    modalStyle: {
        width: width * 4/5,
        padding: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#5388d0',
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




    titleArea: {
        alignItems: 'center',
        marginTop: 20,
    },

    titleText: {
        fontSize: 19,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },

    imageProfile: {
        width: 120,
        height: 120,
        borderRadius: 75,
    },
    editProfilePic: {
        marginTop: 20,
        alignItems: 'center',
    },
    settingInfoArea: {
        padding: 15,
        marginTop: 20,
    },
    settingInfo: {
        backgroundColor: '#e9e9e9',
        padding: 8,
        borderRadius: 3,
    },
    settingText: {
        color: '#545454',
        marginBottom: 4,
    },
});

export default SettingsStyles;