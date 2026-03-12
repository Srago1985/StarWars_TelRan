
import { NavLink } from "react-router";
import { heroQueryParam, navItems } from "../utils/constants.ts";
import { useCurrentHero } from "../hooks/useCurrentHero.ts";

interface NavItemProps {
  item: (typeof navItems)[number];
}

const NavItem = ({item}: NavItemProps) => {
  const { heroID } = useCurrentHero();
  const to = `${item.to}?${heroQueryParam}=${heroID}`;
    
    return (
    <NavLink to={to} className={'bg-danger rounded-md px-3 border cursor-pointer hover:bg-red-500 hover:text-amber-50'}>{item.label}</NavLink>
    )
}

export default NavItem;