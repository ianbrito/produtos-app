import styled from "@emotion/styled"
import { Link } from "@mui/material"
import { ICategoria } from "src/types"

interface Props {
  categorias: ICategoria[]
}

export const TableCategorias = ({ categorias }: Props) => {
  return (
    <table style={{width: '100%'}}>
      <thead>
        <th style={{textAlign: 'center'}}>ID</th>
        <th style={{textAlign: 'left'}}>Nome</th>
      </thead>
      <tbody>
        {categorias.map(categoria => (
          <tr key={categoria.idCategoriaProduto}>
            <td style={{textAlign: 'center'}}>{categoria.idCategoriaProduto}</td>
            <td style={{textAlign: 'left'}}>{categoria.nomeCategoria}</td>
            <td>
              <Link variant="button" href={`/categorias/editar/${categoria.idCategoriaProduto}`}>
                Ver
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}