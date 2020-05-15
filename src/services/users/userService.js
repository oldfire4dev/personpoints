import React from 'react';
import PPAPI from '../../configs/api/axios_config';

export default class UserService {
    createUser = async (user) => {
        return await PPAPI.post('/api/create', user);
    }
}