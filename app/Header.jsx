import { LogoutButton } from '@/components/Clients'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="header">
      <div>
        <h2>Todo. </h2>
      </div>
      <article>
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        <LogoutButton/>
        {/* <LogoutButton/> */}
      </article>
    </div>
  )
}

export default Header
