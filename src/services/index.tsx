import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'

import quotesStore, { IQuotesStore } from './quotes/reducer'
import userStore, { IUserStore } from './user/reducer'

import { actions as quoteActions, methods as quoteMethods } from './quotes/actions'

const rootStore = combineReducers({
  quotesStore,
  userStore,
})

const Store = createStore(rootStore, applyMiddleware(thunk))

export {
  quoteActions,
  quoteMethods,
}

export interface IStore {
  quotesStore: IQuotesStore
  userStore: IUserStore
}

export default Store