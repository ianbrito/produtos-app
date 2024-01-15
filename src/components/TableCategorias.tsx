import { ICategoria } from "src/types"

interface Props {
  categorias: ICategoria[]
}
export const TableCategorias = ({ categorias }: Props) => {
  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Nome</th>
      </thead>
      <tbody>
        {categorias.map(categoria => (
          <tr key={categoria.idCategoriaProduto}>
            <td>{categoria.idCategoriaProduto}</td>
            <td>{categoria.nomeCategoria}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}