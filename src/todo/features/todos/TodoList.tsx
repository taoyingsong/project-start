import React from 'react'
import { List, Row, Col } from 'antd'
import classnames from 'classnames'
import { useAppSelector } from '../../common/hooks/reactRedux'
import { selectFilteredTodoIds } from './todosSlice'
import TodoListItem from './TodoListItem'
import styles from './TodoList.module.less'

const TodoList = () => {
  const todoIds = useAppSelector(selectFilteredTodoIds)
  const loadingStatus = useAppSelector(state => state.todos.status)

  return (
    <section className={classnames('todo-list', styles.todoList)}>
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
