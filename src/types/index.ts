export interface ICategoria {
  idCategoriaProduto: number
  nomeCategoria: string
}

export interface IProduto {
  idProduto: number
  nomeProduto: string
  valorProduto: number
  categoriaProduto: ICategoria
}

export interface IFormCategoria {
  nome: string
}

export interface IFormProduto {
  nome: string
  valor: number
  idCategoriaProduto: number
}
