import { NextApiRequest, NextApiResponse } from 'next/types'
import { api } from 'src/utils/api'
import { IFormProduto } from 'src/types'

interface IRequestData extends IFormProduto {}

async function getAllProducts() {
  return await api.get('/v1/produtos')
}

async function createProduct(data: IRequestData) {
  return await api.post('/v1/produtos', {
    nome_produto: data.nome,
    valor_produto: data.valor,
    id_categoria_produto: data.idCategoriaProduto,
  })
}

async function updateProduct(data: IRequestData) {
  return await api.put('/v1/produtos', {
    nome_produto: data.nome,
    valor_produto: data.valor,
    id_categoria_produto: data.idCategoriaProduto,
  })
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == 'GET') {
    getAllProducts()
      .then(({ data }) => {
        return response.status(200).json(data)
      })
      .catch((err) => {
        return response.status(400).json({ ...err.response.data })
      })
  } else if (request.method == 'POST') {
    createProduct(request.body)
      .then(({ data }) => {
        return response.status(204).json({ ...data })
      })
      .catch((err) => {
        console.error(err)
        return response.status(400).json({ ...err.response.data })
      })
  }
}
