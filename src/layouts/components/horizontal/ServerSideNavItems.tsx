// ** React Imports
import { useEffect, useState } from 'react'

// ** Axios Import
import axios from 'axios'

// ** Type Import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState<HorizontalNavItemsType>([])

  useEffect(() => {
    setMenuItems([
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
    ])
  }, [])

  return { menuItems }
}

export default ServerSideNavItems
