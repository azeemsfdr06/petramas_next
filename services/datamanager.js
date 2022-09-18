// import localStorage from "@react-native-async-storage/async-storage";
// import { fetchUserToken, getUser } from "./api/apiManager";
const KEYS = {
    USER: "USER",
    TOKEN: "TOKEN"
};
export const setUserData = async (data) => {
    try {
        console.log(JSON.stringify(data))
        await localStorage.setItem(KEYS.USER, JSON.stringify(data));
    } catch (err) {
        return null;
    }
};

export const getUserData = async () => {
    try {
        const response = await localStorage.getItem(KEYS.USER);
        if (response) {
            return JSON.parse(response);
        }
        return null;
    } catch (err) {
        return null;
    }
};

export const setToken = async (data) => {
    try {
        console.log(JSON.stringify(data))
        await localStorage.setItem(KEYS.TOKEN, JSON.stringify(data));
    } catch (err) {
        return null;
    }
};


export const getToken = async () => {
    try {
        const response = await localStorage.getItem(KEYS.TOKEN);
        console.log("response", JSON.parse(response))
        if (response) {
            return JSON.parse(response);
        }
        return null;
    } catch (err) {
        return null;
    }
};
