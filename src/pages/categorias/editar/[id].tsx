import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, MenuItem, TextField, Select, Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IFormCategoria, ICategoria } from "src/types";
import * as yup from 'yup'

const schema = yup.object().shape({
  nome: yup.string().required(),
})

export default function EditaCategoria() {
  const router = useRouter()

  const { id } = router.query

  const [categoria, setCategoria] = useState<ICategoria>()

  useEffect(() => {
    const fetchCategoriaData = () => {
      fetch(`/api/categorias/${id}`)
        .then((response) => response.json())
        .then((data) => setCategoria(data))
    }

    if (id)
      fetchCategoriaData()

  }, [id])

  useEffect(() => {
    reset({ nome: categoria?.nomeCategoria })
  }, [categoria])

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IFormCategoria>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: IFormCategoria) => {
    const response = await axios.put(`/api/categorias/${id}`, data)
    setCategoria(response.data)
    router.reload()
  }

  const handleDelete = async () => {
    await axios.delete(`/api/categorias/${id}`)
    router.push('/categorias')
  }

  return (
    <Card>
      <CardHeader title='Cadastrar Produto' />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{display: 'flex',flex: 1, flexDirection: 'column', gap: 4, marginBottom: 4}}>
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
                    placeholder='Eletrodomésticos'
                  />
                )}
              />
              {errors.nome && <FormHelperText sx={{ color: 'error.main' }}>{errors.nome.message}</FormHelperText>}
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
    </Card>)
}