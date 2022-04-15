import { routes } from 'helpers/routes'
import { IconList } from 'components/icon'

import { IMenuList } from './'

export const MenuList: IMenuList[] = [
  {
    path: routes.default,
    icon: IconList.home,
    text: 'Главная',
  },
  {
    path: routes.quotes,
    icon: IconList.quote,
    text: 'Цитаты',
  },
  {
    path: routes.authors,
    icon: IconList.author,
    text: 'Авторы',
  },
  {
    path: routes.profile,
    icon: IconList.user,
    text: 'Профиль',
  }
]