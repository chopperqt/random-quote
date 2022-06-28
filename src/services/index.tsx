import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { useSelector } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createSelector } from 'reselect'

import quotesStore, { QuotesStore } from './quotes/QuotesStore'
import userStore, { UserStore } from './user/reducer'
import notificationsStore, { NotificationsStore } from './notifications/reducer'
import authorsStore, { AuthorsStore } from './authors'
import filtersStore, { FiltersStore } from './filters'

import {
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
import {
  actions as filterActions,
  methods as filterMethods,
} from './filters/actions'
import {
  actions as UserActions,
  methods as UserMethods,
} from './user/actions'

const rootStore = combineReducers({
  quotesStore,
  userStore,
  notificationsStore,
  authorsStore,
  filtersStore,
})

const Store = createStore(rootStore, composeWithDevTools(applyMiddleware(thunk)))

export const Stores = () => {
  const selectStore = createSelector(
    (state: StoreData) => state,
    (state) => state,
  )

  const stores = useSelector(selectStore)

  return {
    NotificationStore: stores.notificationsStore,
    AuthorStore: stores.authorsStore,
    QuoteStore: stores.quotesStore,
    FilterStore: stores.filtersStore,
  }
}

export {
  quoteMethods,
  notificationActions,
  notificationMethods,
  authorsActions,
  authorsMethods,
  filterActions,
  filterMethods,
  UserActions,
  UserMethods,
}

export interface StoreData {
  quotesStore: QuotesStore
  userStore: UserStore
  notificationsStore: NotificationsStore
  authorsStore: AuthorsStore
  filtersStore: FiltersStore
}

export default Store