
import { NavLink } from "react-router";

interface NavItemProps {
  itemTitle: string;
}

const NavItem = ({itemTitle}: NavItemProps) => {
    
    return (
        <NavLink to={`/${itemTitle.toLowerCase()}`} className={'bg-danger rounded-md px-3 border cursor-pointer hover:bg-red-500 hover:text-amber-50'}>{itemTitle}</NavLink>
    )
}

export default NavItem;