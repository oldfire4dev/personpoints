import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

let responsiveHeight;

if(height >= 750) responsiveHeight = height * 0.49;
else if(height < 750 && height >= 620) responsiveHeight = height * 0.43;
else if(height < 620 && height >= 495) responsiveHeight = height * 0.33;

const TasksStyles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#e6e6e6',
    },

    headerArea: {
        backgroundColor: '#fff',
        height: 75,
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

    modalTaskInfoStyle: {
        width: width * 3/4,
        padding: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#5388d0',
    },

    noTasksFoundArea: {
        alignItems: 'center',
        marginTop: width / 2,
    },




    listOfTasksArea: {
        width: '100%',
        padding: 15,
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

export default TasksStyles;