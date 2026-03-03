import { useContext } from "react";
import { ChangePageContext } from "../utils/context.ts";

interface NavItemProps {
  itemTitle: string;
}

const NavItem = ({itemTitle}: NavItemProps) => {
    const { changePage } = useContext(ChangePageContext);
    return (
        <div onClick={() => changePage(itemTitle)} className={'bg-danger rounded-md px-3 border cursor-pointer hover:bg-red-500 hover:text-amber-50'}>{itemTitle}</div>
    )
}

export default NavItem;