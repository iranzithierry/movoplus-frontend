import React from 'react'
import { Metadata } from "next"
import Hero from './components/sections/hero'
import Stats from './components/sections/stats'
import Contact from './components/sections/contact'
import Features from './components/sections/features'
import DashboardView from './components/sections/dashboard-view'
import CeoTestimonial from './components/sections/ceo-testimonial'
import CustomerAlaysis from './components/sections/customers-analysis'

export const metadata: Metadata = {
    title: "Vendors",
}

export const dynamic = 'force-static'
export default function HomePage() {
  return (
    <main>
      <div className="relative isolate pt-6">
        <div className="px-6 py-24 sm:py-32  lg:px-8">
          <Hero />
        </div>
        <div className="px-6 lg:px-8 py-24">
          <Features />
        </div>
        <div className="px-6 lg:px-8 py-24">
          <Stats />
        </div>
        <div className="px-6 lg:px-8 py-24">
          <CustomerAlaysis />
        </div>
        <div className="px-6 lg:px-8 py-24">
          <DashboardView />
        </div>
        <div className="px-6 lg:px-8 py-24">
          <Contact />
        </div>
      </div>
      <div className="mx-auto">
        <CeoTestimonial />
      </div>
    </main>
  )
}
