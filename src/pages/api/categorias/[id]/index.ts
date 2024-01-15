import { NextApiRequest, NextApiResponse } from 'next/types'
import { IFormCategoria } from 'src/types'
import { api } from 'src/utils/api'

interface IRequestData extends IFormCategoria {}

async function getCategory(id: number | string) {
  return await api.get(`/v1/categoria-produtos/${id}`)
}

async function updateCategory(id: number | string, data: IRequestData) {
  return await api.put(`/v1/categoria-produtos/${id}`, {
    nome_categoria: data.nome,
  })
}

async function deleteCategory(id: number | string) {
  return await api.delete(`/v1/categoria-produtos/${id}`)
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as { id: string }
  if (request.method == 'GET') {
    getCategory(id)
      .then(({ data }) => {
        return response.status(200).json(data)
      })
      .catch((err) => {
        return response.status(400).json({ ...err.response.data })
      })
  } else if (request.method == 'PUT') {
    updateCategory(id, request.body)
      .then(({ data }) => {
        return response.status(204).json({ ...data })
      })
      .catch((err) => {
        console.error(err)
        return response.status(400).json({ ...err.response.data })
      })
  } else if (request.method == 'DELETE') {
    deleteCategory(id)
      .then(({ data }) => {
        return response.status(204).json({ ...data })
      })
      .catch((err) => {
        console.error(err)
        return response.status(400).json({ ...err.response.data })
      })
  }
}
