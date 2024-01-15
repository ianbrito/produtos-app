import { create } from 'domain'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { api } from 'src/utils/api'

interface IRequestData {
  nome: string
}

async function getAllCategories() {
  return await api.get('/v1/categoria-produtos')
}

async function createCategory(data: IRequestData) {
  return await api.post('/v1/categoria-produtos', {
    nome_categoria: data.nome,
  })
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == 'GET') {
    getAllCategories()
      .then(({ data }) => {
        return response.status(200).json(data)
      })
      .catch((err) => {
        return response.status(400).json({ ...err.response.data })
      })
  } else if (request.method == 'POST') {
    createCategory(request.body)
      .then(({ data }) => {
        return response.status(204).json({ ...data })
      })
      .catch((err) => {
        console.error(err)
        return response.status(400).json({ ...err.response.data })
      })
  }
}
