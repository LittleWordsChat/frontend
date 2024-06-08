import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      HOME

      <section>
        <Outlet/>
      </section>
    </div>
  )
}

export default Home