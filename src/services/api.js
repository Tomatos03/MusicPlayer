import { request } from "@/network/request";

// const apiUrl = 'http://localhost:3000';

export const getAccountById = async (id) => {
    const res = await request('/user/detail', {
        uid: id
    });
    return res.data;
};

