import firebase from '../../configs/firebase';
import 'firebase/firestore';

import TaskService from '../../services/task/task_service';

const task_service = new TaskService();
const firestore = firebase.firestore();

export default class TaskController {
    create = async (task, pid) => {
        try {
            task_service.createTask(task, pid)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    delete = async (tid) => {
        try {
            firestore.collection('tasks').doc(tid).delete();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    fetchAllTasks = async (pid) => {
        try {
            return firestore.collection('tasks').where('personId', '==', pid)
        } catch (error) {
            return Promise.reject(error);
        }
    }

}