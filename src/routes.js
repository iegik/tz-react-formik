import React from 'react'
import { HashRouter , Switch, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import ProductsContainer from './components/Products/ProductsContainer'
import ProductEditForm from './components/Products/ProductEditForm'
import NotFound from './components/NotFound/NotFound'

export function getRoutes() {
  return (
    <HashRouter>
      <Main>
        <Switch>
          <Route exact path="/" component={ProductsContainer}/>,
          <Route exact path="/edit" component={ProductEditForm}/>,
          <Route path="*" component={NotFound}/>,
        </Switch>
      </Main>
    </HashRouter >
  )
}

export default getRoutes
