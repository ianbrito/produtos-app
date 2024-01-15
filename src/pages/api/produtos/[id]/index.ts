import { NextApiRequest, NextApiResponse } from 'next/types'
import { IFormProduto } from 'src/types'
import { api } from 'src/utils/api'

interface IRequestData extends IFormProduto {}

async function getProduct(id: number | string) {
  return await api.get(`/v1/produtos/${id}`)
}

async function updateProduct(id: number | string, data: IRequestData) {
  return await api.put(`/v1/produtos/${id}`, {
    nome_produto: data.nome,
    valor_produto: data.valor,
    id_categoria_produto: data.idCategoriaProduto,
  })
}

async function deleteProduct(id: number | string) {
  return await api.delete(`/v1/produtos/${id}`)
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as { id: string }
  if (request.method == 'GET') {
    getProduct(id)
      .then(({ data }) => {
        return response.status(200).json(data)
      })
      .catch((err) => {
        return response.status(400).json({ ...err.response.data })
      })
  } else if (request.method == 'PUT') {
    updateProduct(id, request.body)
      .then(({ data }) => {
        return response.status(204).json({ ...data })
      })
      .catch((err) => {
        console.error(err)
        return response.status(400).json({ ...err.response.data })
      })
  } else if (request.method == 'DELETE') {
    deleteProduct(id)
      .then(({ data }) => {
        return response.status(204).json({ ...data })
      })
      .catch((err) => {
        console.error(err)
        return response.status(400).json({ ...err.response.data })
      })
  }
}
