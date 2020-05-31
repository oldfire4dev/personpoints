import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

let responsiveHeight;

if(height >= 750) responsiveHeight = height * 0.49;
else if(height < 750 && height >= 620) responsiveHeight = height * 0.43;
else if(height < 620 && height >= 495) responsiveHeight = height * 0.33;

const DashboardStyles = StyleSheet.create({
    app: {
        flex: 1,
    },

    headerArea: {
        backgroundColor: '#203f78',
        borderBottomColor: '#5388d0',
        borderBottomWidth: 10,
        height: 280,
        maxHeight: '100%',
    },

    personArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 25,
    },

    personInfoArea: {
        alignItems: 'center',
        marginTop: 15,
    },

    noPersonText: {
        color: '#fff',
        marginTop: 12,
        fontSize: 24,
        fontFamily: 'sans-serif',
        width: 180,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },

    createPersonArea: {
        alignItems: 'center',
        marginTop: 150,
    },

    createPersonText: {
        fontSize: 24,
        textAlign: 'center',
        textTransform: 'uppercase',
        width: 150,
    },

    createPersonButton: {
        backgroundColor: '#000',
        borderRadius: 75,
        padding: 10,
        width: 70,
        alignItems: 'center',
        marginTop: 50,
    },

    tasksTextArea: {
        marginTop: 20,
        marginLeft: 30,
        flexDirection: 'row',
    },

    tasksText: {
        fontSize: 22,
        color: '#545454',
    },

    modalStyle: {
        width: width * 4/5,
        padding: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#5388d0',
    },

    modalChangePersonStyle: {
        width: width * 3/4,
        padding: 20,
        borderBottomWidth: 7,
        borderBottomColor: '#5388d0',
    },

    modalCreateTaskStyle: {
        width: width * 4/5,
        padding: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#5388d0',
    },
    
    modalTaskInfoStyle: {
        width: width * 3/4,
        padding: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#5388d0',
    },

    noTasksFoundArea: {
        alignItems: 'center',
        marginTop: width / 4,
    },


    personName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 21,

    },
    personTierImageArea: {
        marginTop: 10,
    },
    personTierImage: {
        width: 116,
        height: 116,
    },
    personTierName: {
        color: '#e3e3e3',
        fontFamily: 'sans-serif',
        fontSize: 14,
    },
    personPoints: {
        color: '#e3e3e3',
        fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
    },



    createTaskBtn: {
        borderRadius: 75,
        width: 56,
        height: 56,
    },
    createTaskBtnArea: {
        marginTop: width / 3.75,
    },
    listOfTasksArea: {
        marginTop: 20,
        backgroundColor: '#e6e6e6',
        width: '100%',
        padding: 15,
        height: responsiveHeight
    },
    taskStyle: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
    },
    arrowLeftStyle: {
        position: 'absolute',
        right: 12,
    },
    taskValuePoints:{
        position: 'absolute',
        right: 40,
        flexDirection: 'column',
    },
    
});

export default DashboardStyles;