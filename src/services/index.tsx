import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { useSelector } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import quotesStore, { QuotesStore } from './quotes'
import userStore, { UserStore } from './user/reducer'
import notificationsStore, { INotificationsStore } from './notifications/reducer'
import authorsStore, { IAuthorsStore } from './authors'
import filtersStore, { IFilterStore } from './filters'

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
  const NotificationStore = useSelector((store: IStore) => store.notificationsStore)
  const AuthorStore = useSelector((store: IStore) => store.authorsStore)
  const QuoteStore = useSelector((store: IStore) => store.quotesStore)
  const FilterStore = useSelector((store: IStore) => store.filtersStore)

  return {
    NotificationStore,
    AuthorStore,
    QuoteStore,
    FilterStore,
  }
}

export {
  quoteActions,
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

export interface IStore {
  quotesStore: QuotesStore
  userStore: UserStore
  notificationsStore: INotificationsStore
  authorsStore: IAuthorsStore
  filtersStore: IFilterStore
}

export default Store