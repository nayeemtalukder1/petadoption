'use client'

import { useState } from 'react'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Hero() {

  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src="https://www.shutterstock.com/image-vector/smiling-preschool-girl-kid-sitting-600nw-1101658868.jpg"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Welcome to Petenica</h1>
      <p className="py-6">
        Broadcast neglectful and poignantly well until and some listlessly amidst suc cessful concentrically ably dachshund more far but forwardly echidna outside tiger split thanks far vibrantly gosh hence pangolin however notwithstanding leapt untruthful gauchely yikes komodo dully more.
As abandoned winced this more far wow jeepers near more wow goodness so revealed much along worm some grasshopper.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
  )
}
