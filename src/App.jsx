import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorkforceShift from './components/WorkforceShift'
import Problem from './components/Problem'
import MissingLayer from './components/MissingLayer'
import ProductOverview from './components/ProductOverview'
import Passport from './components/Passport'
import AutonomyLadder from './components/AutonomyLadder'
import HowItWorks from './components/HowItWorks'
import KillerMoment from './components/KillerMoment'
import UseCases from './components/UseCases'
import Platform from './components/Platform'
import WhatPraxisOwns from './components/WhatPraxisOwns'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <WorkforceShift />
        <Problem />
        <MissingLayer />
        <ProductOverview />
        <Passport />
        <AutonomyLadder />
        <HowItWorks />
        <KillerMoment />
        <UseCases />
        <Platform />
        <WhatPraxisOwns />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
