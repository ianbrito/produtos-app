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
import * as yup from 'yup'

const schema = yup.object().shape({
  nome: yup.string().required(),
  valor: yup.number().required(),
  idCategoriaProduto: yup.number().required().label('categoria do produto'),
})

interface ICategoria {
  idCategoriaProduto: number,
  nomeCategoria: string,
}


interface IFormProduto {
  nome: string,
  valor: number,
  idCategoriaProduto: number,
}

export function FormProduto() {

  const router = useRouter()

  const [categorias, setCategoria] = useState<ICategoria[]>()

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/categorias')
        .then((response) => response.json())
        .then((data) => setCategoria(data))
    }
    fetchData()
  }, [])

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormProduto>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: IFormProduto) => {
    const response = await axios.post('/api/produtos', data)
    router.reload()
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
                    {categorias?.map(c => (<MenuItem value={c.idCategoriaProduto}>{c.nomeCategoria}</MenuItem>))}
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
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}