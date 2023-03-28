import React from 'react'
import TopBar from '../../../../components/sections/TopBar'
import BodySection from '../../../../components/sections/BodySection'
import FooterSection from '../../../../components/sections/FooterSection';

const Main = () => {
  return (
    <div>
        <TopBar/>
        <h1>Examination Officer Home</h1>
        <BodySection />
        <FooterSection />
    </div>
  )
}

export default Main