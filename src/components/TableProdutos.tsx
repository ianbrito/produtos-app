import { IProduto } from "src/types"

interface Props {
  produtos: IProduto[]
}
export const TableProduto = ({ produtos }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Valor</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        {produtos?.map(produto => (
          <tr>
            <td>{produto.idProduto}</td>
            <td>{produto.nomeProduto}</td>
            <td>{produto.valorProduto}</td>
            <td>{produto.categoriaProduto.nomeCategoria}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}