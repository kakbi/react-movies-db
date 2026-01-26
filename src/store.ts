import { applyMiddleware, createStore, type UnknownAction } from 'redux';

import rootReducer from './reducers/index';
import { composeWithDevTools } from '@redux-devtools/extension/';
import { thunk, type ThunkAction } from 'redux-thunk';

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, composeEnhancer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    UnknownAction
>;

export default store;
