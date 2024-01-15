import { yupResolver } from '@hookform/resolvers/yup'
import { FormHelperText } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { api } from 'src/utils/api'
import * as yup from 'yup'

const schema = yup.object().shape({
  nome: yup.string().required(),
})

interface IFormCategoria {
  nome: string
}

export function FormCategoria() {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormCategoria>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: IFormCategoria) => {
    const response = await api.post('/api/categorias', data)
  }
  return (
    <Card>
      <CardHeader title='Cadastrar Categoria' />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Controller
              name='nome'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label='Nome da Categoria'
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
          <Button size='large' type='submit' variant='contained'>
            Salvar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}