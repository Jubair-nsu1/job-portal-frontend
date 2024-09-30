import React from 'react'

import {
    CFooter,
  } from '@coreui/react'

const Footer = () => {
  return (
    <CFooter style={{backgroundColor:'black'}}>
    <div class="d-flex justify-content-center">
        <div>
            <span style={{color:'white', fontWeight:'bold'}}>&copy; BYLC Job Portal @ 2024 Copyright</span>
        </div>
        {/* <div>
            <span style={{color:'white', fontWeight:'bold'}}>Powered by BYLC IT</span>
        </div> */}
    </div>
    </CFooter>
  )
}

export default Footer