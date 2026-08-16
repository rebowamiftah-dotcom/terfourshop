import Link from "next/link"
import type { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link> & { title: string };

const NavLink = ({ title, ...props }: NavLinkProps) => {
  return (
    <Link {...props} >
      {title}
    </Link>
  )
}

export default NavLink