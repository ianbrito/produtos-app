import { Link } from "@mui/material"
import { IProduto } from "src/types"

interface Props {
  produtos: IProduto[]
}
export const TableProduto = ({ produtos }: Props) => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>ID</th>
          <th style={{ textAlign: 'left' }}>Nome</th>
          <th style={{ textAlign: 'left' }}>Valor</th>
          <th style={{ textAlign: 'left' }}>Categoria</th>
        </tr>
      </thead>
      <tbody>
        {produtos?.map(produto => (
          <tr>
            <td style={{ textAlign: 'center' }}>{produto.idProduto}</td>
            <td style={{ textAlign: 'left' }}>{produto.nomeProduto}</td>
            <td style={{ textAlign: 'left' }}>{produto.valorProduto}</td>
            <td style={{ textAlign: 'left' }}>{produto.categoriaProduto.nomeCategoria}</td>
            <td>
              <Link variant="button" href={`/produtos/editar/${produto.idProduto}`}>
                Ver
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}