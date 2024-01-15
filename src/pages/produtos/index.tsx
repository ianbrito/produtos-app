import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { FormProduto } from 'src/components/FormProduto'
import { TableProduto } from 'src/components/TableProdutos'
import { IProduto } from 'src/types'

export default function Produtos() {
  const [produtos, setProdutos] = useState<IProduto[]>()

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/produtos')
        .then((response) => response.json())
        .then((data) => setProdutos(data))
    }
    fetchData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormProduto />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {produtos ? <TableProduto produtos={produtos} /> : (<h1>Carregando</h1>)}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )

}