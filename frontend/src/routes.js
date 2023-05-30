import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Error from './pages/Error'
import Welcome from './pages/Welcome'
import Summary from './pages/Summary'
import Quarter from './pages/Quarter'
import Preview from './pages/Preview'
import Thanks from './pages/Thanks'

export default function Routes() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" exact element={<Welcome />} errorElement={<Error />}/>
        <Route path="/resumo" element={<Summary />}/>
        <Route path="/quadri" element={<Quarter />}/>
        <Route path="/preview" element={<Preview />}/>
        <Route path="/obrigado" element={<Thanks />}/>
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  ) 
}