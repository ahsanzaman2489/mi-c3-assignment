import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configure(initialState) {
    const create = window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore

    const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(create)

    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }
    return store
}
