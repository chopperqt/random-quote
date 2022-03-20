import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'

import quotesStore, { IQuotesStore } from './quotes/reducer'
import userStore, { IUserStore } from './user/reducer'
import notificationsStore, { INotificationsStore } from './notifications/reducer'

import {
  actions as quoteActions,
  methods as quoteMethods
} from './quotes/actions'
import {
  actions as notificationActions,
  methods as notificationMethods,
} from './notifications/actions'

const rootStore = combineReducers({
  quotesStore,
  userStore,
  notificationsStore,
})

const Store = createStore(rootStore, applyMiddleware(thunk))

export {
  quoteActions,
  quoteMethods,
  notificationActions,
  notificationMethods,
}

export interface IStore {
  quotesStore: IQuotesStore
  userStore: IUserStore
  notificationsStore: INotificationsStore
}

export default Store