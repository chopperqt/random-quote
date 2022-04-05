import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'

import quotesStore, { IQuotesStore } from './quotes'
import userStore, { IUserStore } from './user/reducer'
import notificationsStore, { INotificationsStore } from './notifications/reducer'
import authorsStore, { IAuthorsStore } from './authors'

import {
  actions as quoteActions,
  methods as quoteMethods
} from './quotes/actions'
import {
  actions as notificationActions,
  methods as notificationMethods,
} from './notifications/actions'
import {
  actions as authorsActions,
  methods as authorsMethods,
} from './authors/actions'

const rootStore = combineReducers({
  quotesStore,
  userStore,
  notificationsStore,
  authorsStore,
})

const Store = createStore(rootStore, applyMiddleware(thunk))

export {
  quoteActions,
  quoteMethods,
  notificationActions,
  notificationMethods,
  authorsActions,
  authorsMethods
}

export interface IStore {
  quotesStore: IQuotesStore
  userStore: IUserStore
  notificationsStore: INotificationsStore
  authorsStore: IAuthorsStore
}

export default Store