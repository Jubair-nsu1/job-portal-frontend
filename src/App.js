import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Individual = React.lazy(() => import('./views/pages/circular/Individual'))
const Total = React.lazy(() => import('./views/pages/circular/Total'))
const Form = React.lazy(() => import('./views/pages/circular/Form'))


class App extends Component {
  render() {
    const user = localStorage.getItem("token");

    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            {/* My created page */}
            <Route path="/login" name="Login Page" element={<Login />} />

            <Route exact path="/" name="Career" element={<Total />} />  
            <Route exact path="/jobDetails/:id" name="Job Details" element={<Individual />} />
            <Route exact path="/jobDetails/form/:id" name="Form" element={<Form />} />
            

            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            
            
            {user? 
              (<Route exact path="*" name="dashboard" element={<DefaultLayout />} />) 
              : 
              (<Route path="/login" name="Login Page" element={< Navigate replace to="/login" />} />)  
            }

          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
