
export const actions = {
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_VEHICLE: "SET_VEHICLE",
  SET_CLIENT: "SET_CLIENT"
};
export const reducer = (state, action) => {
  switch (action.type) {
     case actions.SET_USER:
        return {
           ...state,
           user: action.payload,
        };
     case actions.SET_TOKEN:
        return {
           ...state,
           userToken: action.payload,
        };
     case actions.SET_VEHICLE:
        return {
           ...state,
           vehicle: action.payload,
        };
     case actions.SET_CLIENT:
        return {
           ...state,
           client: action.payload,
        };
     default:
        return state;
  }
};
