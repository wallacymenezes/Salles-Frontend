//import Navbar, { NavItem } from "@/components/navbar/Navbar";
//import {LayoutDashboard, ShoppingCart, UserPen} from 'lucide-react';

import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return ( 
    <div>
      <Sidebar/>
      <main className="ml-[25%]">
        <h1 className="text-white">Home</h1>
      </main>
    </div>
  )
}