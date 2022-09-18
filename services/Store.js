import { createState } from '@hookstate/core';
import { getUserData, getToken } from './datamanager';

export const Store = createState({
    user: null,
    token: null,
    loading:true
});
export const getSessionFromLocalStorage = async (data) => {
    await getUserData().then(async data => {
        if (data) {
            Store.user.set(data)
        }
        await getToken().then(async (data) => {
            if (data) {
                Store.token.set(data)
            }
            Store.loading.set(false)
        })
    })
}
export const clearSession = async () => {
    Store.loading.set(true)
    localStorage.clear();
    Store.loading.set(false)
}
export const getUserSession = (data) => {
    Store.user.get()
}
