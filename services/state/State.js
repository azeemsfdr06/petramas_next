/* eslint-disable no-shadow */
import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from './initialState';

export const StateContext = createContext(initialState);
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
