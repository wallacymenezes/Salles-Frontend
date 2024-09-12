//import React from 'react'

import { ChevronFirst } from "lucide-react"

function Navbar() {
  return (
    <aside className="h-screen">
        <nav className="h-full flex flex-col bg-black text-white border-r border-zinc-100 shadow-sm">
            <div>
                <img src="https://i.ibb.co/R2KQDDk/name-logo-dark-recortada.png" alt="name-logo-dark-recortada" />
                <button>
                    <ChevronFirst size={24} />
                </button>
            </div>
            <ul>
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#">Sobre</a>
            </li>
            <li>
                <a href="#">Contato</a>
            </li>
            </ul>
        </nav>
    </aside>
  )
}

export default Navbar