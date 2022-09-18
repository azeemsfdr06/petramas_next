/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { settings as s } from "../settings";
import {
   getData,
   postData,
   postFormData,
   postDataAnonymously,
   uploadFiles,
} from "./apiCalls";

export const login = async (data) => {
   try {
      const response = await postDataAnonymously(`${s.user.login}`, data);
      return response;
   } catch (err) {
      console.log('ERROR : ', err);
      return null;
   }
};
export const editGPS = async (data) => {
   try {
      const response = await postDataAnonymously(`${s.user.editGPS}`, data);
      return response;
   } catch (err) {
      console.log('ERROR : ', err);
      return null;
   }
};

export const saveGPSPanel = async (data) => {
   try {
      console.log(`${s.user.saveGPSPanel}`, data)
      const response = await uploadFiles(`${s.user.saveGPSPanel}`, data);
      return response;
   } catch (err) {
      console.log('ERROR : ', err);
      return null;
   }
};
export const dellGPS = async (data) => {
   try {
      console.log(`${s.user.dellGPS}`, data)
      const response = await postDataAnonymously(`${s.user.dellGPS}`, data);
      return response;
   } catch (err) {
      console.log('ERROR : ', err);
      return null;
   }
};

export const uploadImage = async (data) => {
   try {
      const response = await uploadFiles(`${s.user.uploadImage}`, data);
      return response;
   } catch (err) {
      console.log('ERROR : ', err);
      return null;
   }
};
export const getVehileNames = async()=>{
   try{
      const response = await getData(s.user.getVehicleNames)
      return response;
   }catch(err){
      console.log(err)
      return null
   }
   
}
export const getClientNames = async()=>{
   try{
      const response = await getData(s.user.getClientNames)
      return response;
   }catch(err){
      console.log(err)
      return null
   }
   
}
export const getRouteNames = async()=>{
   try{
      const response = await getData(s.user.getRouteNames)
      console.log(response)
      return response;
   }catch(err){
      console.log(err)
      return null
   }
}
export const getGPS = async()=>{
   try{
      const response = await getData(s.user.getGPS)
      console.log(response)
      return response;
   }catch(err){
      console.log(err)
      return null
   }
}
// export const fetchUserToken = async (data) => {
//    try {
//       const response = await postDataAnonymously(`${s.account.refreshToken}`, data);
//       return response;
//    } catch (err) {
//       console.log('ERROR : ', err);
//       return null;
//    }
// }

// export const saveUser = async (data) => {
//    try {
//       const response = await postDataAnonymously(`${s.account.register}`, data);
//       return response;
//    } catch (err) {
//       console.log('ERROR : ', err);
//       return null;
//    }
// };

// export const updateUser = async (data) => {
//    try {
//       const response = await postData(`${s.user.update}`, data);
//       return response;
//    } catch (err) {
//       return null;
//    }
// };

// export const forgotPassword = async (data) => {
//    try {
//       const response = await postDataAnonymously(`${s.user.forgotPassword}`, data);
//       return response;
//    } catch (err) {
//       return null;
//    }
// };

// export const validateCode = async (data) => {
//    try {
//       const response = await postData(`${s.user.validateResetCode}`, data);
//       return response;
//    } catch (err) {
//       return null;
//    }
// };

// export const resetPassword = async (data) => {
//    try {
//       const response = await postData(`${s.user.resetPassword}`, data);
//       return response;
//    } catch (err) {
//       return null;
//    }
// };

// export const paymentIntent = async (data) => {
//    try {
//       const response = await postData(`${s.user.paymentIntent}`, data);
//       return response;
//    } catch (err) {
//       return null;
//    }
// };

// export const createNewPaymentIntent = async (data) => {
//    try {
//       const response = await postData(`${s.user.createpaymentIntent}`, data);
//       return response;
//    } catch (err) {
//       return null;
//    }
// };

// export const confirmPaymentIntent = async (data) => {
//    try {
//       const response = await postData(`${s.user.confirmPaymentIntent}`, data);
//       return response;
//    } catch (err) {
//       return null;
//    }
// };

// export const uploadPrescriptions = async (data) => {
//    try {
//       const response=await uploadFiles(`${s.orders.createorder}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };
// export const getOrders = async (data) => {
//    try {
//       const response=await getData(`${s.orders.getorders}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };

// export const getCompletedOrders = async (data) => {
//    try {
//       const response=await getData(`${s.orders.getCompletedOrders}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };

// export const getOrderForTracking = async (data) => {
//    try {
//       const response=await getData(`${s.orders.getOrdersForTracking}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };

// export const updateAnOrder = async (data) => {
//    try {
//       const response=await postData(`${s.orders.cancelOrder}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };

// export const addPaymentMethod = async (data) => {
//    try {
//       const response=await postData(`${s.user.updatePaymentMethod}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };

// export const saveDosageReminders = async (data) => {
//    try {
//       const response=await postData(`${s.carePlan.userDosageReminders}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };

// export const getUser = async (data) => {
//    try {
//       const response=await getData(`${s.user.getUser}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };

// export const savePlayerId = async (data) => {
//    try {
//       const response=await postData(`${s.user.updatePlayerId}`,data);
//       return response;
//    } catch (err) {
//       console.log('ERROR Uploading Prescriptions : ', err);
//       return null;
//    }
// };
