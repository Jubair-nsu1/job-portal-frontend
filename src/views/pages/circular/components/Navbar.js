import React from 'react'
import logo from '../images/bylclogo.png'

import {
    CNavbar,
    CContainer,
    CNavbarBrand,
    CImage,
  } from '@coreui/react'

const Navbar = () => {
  return (
    <CNavbar expand="sm" style={{ backgroundImage: `linear-gradient(to right, rgba(29,43,29,1) 0%, rgba(24,121,9,1) 37%, rgba(0,255,81,1) 100% ` }}>
        <CContainer fluid>
            <CNavbarBrand>
                <CImage src={logo} width={160} height={50} />
            </CNavbarBrand>
        </CContainer>
    </CNavbar>
  )
}

export default Navbar