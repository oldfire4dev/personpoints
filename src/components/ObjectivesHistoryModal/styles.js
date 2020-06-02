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

    taskTextStyle: {
        backgroundColor: '#ededed',
        borderRadius: 5,
        padding: 6,
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




    listOfObjectivesArea: {
        width: '100%',
        padding: 15,
    },
    objectivesArea: {
        flexDirection: 'row',
    },
    objectiveTitle: {
        alignSelf: 'center',
        color: '#ececec',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    objectiveStyle: {
        backgroundColor: '#5388d0',
        height: 192,
        width: 246,
        padding: 15,
        justifyContent: 'space-between',
        marginRight: 8,
        marginBottom: 6,
        borderRadius: 6,
    },
    objectiveValuePoints:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    hoursAndDateObjective: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#5a97ed',
        borderRadius: 4,
        padding: 9,
    },
    dateTitleText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },

})

export default styles;