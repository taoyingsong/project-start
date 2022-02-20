import React from 'react'
import { Button, Space } from 'antd'
import { useAppSelector, useAppDispatch } from '../../common/hooks/reactRedux'
import { allTodosCompleted, completedTodosCleared, selectTodos } from '../todos/todosSlice'

const Footer = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todos)
  const todosRemaining = useAppSelector(state => {
    const uncompletedTodos = selectTodos(state).filter(todo => !todo.completed)
    return uncompletedTodos.length
  })

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted())
  const onClearCompletedClicked = () => dispatch(completedTodosCleared())

  return (
    <section className="todo-footer" data-testid="todoFooter">
      <div>{`剩余的待办事项: ${todosRemaining}项`}</div>
      <div className="actions">
        <Space>
          <Button type="primary" size="large" onClick={onMarkCompletedClicked}>
            全部标记为完成
          </Button>
          <Button type="primary" size="large" onClick={onClearCompletedClicked}>
            清除已完成的
          </Button>
        </Space>
      </div>
    </section>
  )
}

export default React.memo(Footer)
