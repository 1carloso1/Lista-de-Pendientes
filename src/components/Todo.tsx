/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import {type Todo as TodoType, type TodoId} from "../types/types"

interface Props extends TodoType{
    onRemoveTodo: ({ id }: TodoId) => void
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void

}

export const Todo: React.FC<Props> = ({id, title, completed, onRemoveTodo, onToggleCompleteTodo}) => {
    return (
        <div className="view">
            <input
            className="toggle"
            checked={completed}
            type="checkbox"
            onChange={(event) => {onToggleCompleteTodo({id, completed: event.target.checked})}}
            />
            <label>{title}</label>
            <button
                className="destroy"
                onClick={() => {
                    onRemoveTodo({id})
                }}
            />
        </div>
    )
}