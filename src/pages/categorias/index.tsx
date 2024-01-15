import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { FormCategoria } from 'src/components/FormCategoria'
import { TableCategorias } from 'src/components/TableCategorias'
import { ICategoria } from 'src/types'

export default function Categorias() {

  const [categorias, setCategoria] = useState<ICategoria[]>()

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/categorias')
        .then((response) => response.json())
        .then((data) => setCategoria(data))
    }
    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormCategoria />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {categorias ? <TableCategorias categorias={categorias} /> : (<h1>Carregando</h1>)}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )

}