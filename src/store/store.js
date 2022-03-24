import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { personasReducer } from '../reducers/personasReducer';
import { productosReducer } from '../reducers/productosReducer';
import { sucursalesReducer } from '../reducers/sucursalesReducer';
import { uiReducer } from '../reducers/uiReducer';
import { ventasReducer } from '../reducers/ventasReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    ui: uiReducer,
    sucursales: sucursalesReducer,
    personas: personasReducer,
    auth: authReducer,
    productos: productosReducer,
    ventas: ventasReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);