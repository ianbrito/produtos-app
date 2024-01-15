// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Produtos',
      path: '/produtos',
      icon: 'bx:home-circle',
    },
    {
      title: 'Categorias',
      path: '/categorias',
      icon: 'bx:envelope',
    }
  ]
}

export default navigation
