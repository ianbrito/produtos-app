import { yupResolver } from '@hookform/resolvers/yup'
import { Box, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ICategoria, IFormProduto, IProduto } from 'src/types'
import * as yup from 'yup'

const schema = yup.object().shape({
  nome: yup.string().required(),
  valor: yup.number().required(),
  idCategoriaProduto: yup.number().required().label('categoria do produto'),
})

export default function EditaProduto() {

  const router = useRouter()

  const { id } = router.query

  const [produto, setProduto] = useState<IProduto>()

  const [categorias, setCategorias] = useState<ICategoria[]>()

  useEffect(() => {
    const fetchProdutoData = () => {
      fetch(`/api/produtos/${id}`)
        .then((response) => response.json())
        .then((data) => setProduto(data))
    }

    const fetchCatagoriasData = () => {
      fetch('/api/categorias')
        .then((response) => response.json())
        .then((data) => setCategorias(data))
    }

    if (id) {
      fetchCatagoriasData()
      fetchProdutoData()
    }
  }, [])

  useEffect(() => {
    reset({
      nome: produto?.nomeProduto,
      valor: produto?.valorProduto,
      idCategoriaProduto: produto?.categoriaProduto.idCategoriaProduto
    })
  }, [produto, categorias])

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormProduto>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: IFormProduto) => {
    const response = await axios.put(`/api/produtos/${id}`, data)
  }

  const handleDelete = async () => {
    await axios.delete(`/api/produtos/${id}`)
    router.push('/produtos')
  }

  return (
    <Card>
      <CardHeader title='Cadastrar Produto' />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 2, marginBottom: 4 }}>
            <FormControl>
              <Controller
                name='nome'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='Nome do Produto'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.nome)}
                    placeholder='eletrodomésticos'
                  />
                )}
              />
              {errors.nome && <FormHelperText sx={{ color: 'error.main' }}>{errors.nome.message}</FormHelperText>}
            </FormControl>
            <FormControl>
              <Controller
                name='valor'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='Valor do Produto'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.valor)}
                    placeholder='eletrodomésticos'
                  />
                )}
              />
              {errors.valor && <FormHelperText sx={{ color: 'error.main' }}>{errors.valor.message}</FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel id="idCategoriaProdutoLabel">Categoria do Produto</InputLabel>
              <Controller
                name='idCategoriaProduto'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    labelId="idCategoriaProdutoLabel"
                    id="idCategoriaProduto"
                    label="Categoria do Produto"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.idCategoriaProduto)}
                    placeholder='selecione a categoria do produto'
                  >
                    {categorias?.map(categoria => (<MenuItem value={categoria.idCategoriaProduto}>{categoria.nomeCategoria}</MenuItem>))}
                  </Select>
                )}
              />
              {errors.idCategoriaProduto && <FormHelperText sx={{ color: 'error.main' }}>{errors.idCategoriaProduto.message}</FormHelperText>}
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button size='large' type='submit' variant='contained'>
              Salvar
            </Button>
            <Button size='large' color="error" type='button' onClick={handleDelete} variant='contained'>
              Deletar
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}