/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { TodoTitle } from "../types/types"
import { CreateTodo } from "./CreateTodo"

interface Props{
    onAddTodo: ({title}: TodoTitle) => void
}
export const Header: React.FC<Props> = ({onAddTodo}) => {
    return(
        <header className="header">
            <h1>Pendientes</h1>

            <CreateTodo saveTodo={onAddTodo} />
        </header>

    )
}