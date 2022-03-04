import React, { useEffect } from 'react'
import { List, Row, Col } from 'antd'
import classnames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactRedux'
import { fetchTodos, selectFilteredTodoIds } from './todosSlice'
import TodoListItem from './TodoListItem'
import styles from './TodoList.module.css'

const TodoList = () => {
  const todoIds = useAppSelector(selectFilteredTodoIds)
  const dispatch = useAppDispatch()
  const loadingStatus = useAppSelector(state => state.todos.status)
  useEffect(() => {
    dispatch(fetchTodos())
  }, [])
  return (
    <section className={classnames('todo-list', styles.todoList)} data-testid="todoList">
      <Row>
        <Col span={8} offset={8}>
          <List
            dataSource={todoIds}
            renderItem={(todoId: number) => (
              <List.Item>
                <TodoListItem key={todoId} id={todoId} />
              </List.Item>
            )}
            loading={loadingStatus === 'loading'}
            split
          />
        </Col>
      </Row>
    </section>
  )
}

export default React.memo(TodoList)
