import React from 'react'
import { Button, Checkbox, Col, Row, Select } from 'antd'
import { availableColors, capitalize } from '../filters/colors'
import { selectTodoById, todoColorSelected, todoDeleted, todoToggled } from './todosSlice'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactRedux'

const { Option } = Select

interface UTodoItemProps {
  id: number
}

const TodoListItem = ({ id }: UTodoItemProps) => {
  const todo = useAppSelector(state => selectTodoById(state, id))
  const { text = '', completed = false, color = '' } = todo || {}

  const dispatch = useAppDispatch()

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo!.id))
  }

  const handleColorChanged = (color: string) => {
    dispatch(todoColorSelected(todo!.id, color))
  }

  const onDelete = () => {
    dispatch(todoDeleted(todo!.id))
  }

  const colorOptions = availableColors.map(c => (
    <Option key={c} value={c}>
      {capitalize(c)}
    </Option>
  ))

  return (
    <Row style={{ width: '100%', fontSize: '20px' }}>
      <Col span={2}>
        <Checkbox checked={completed} onChange={handleCompletedChanged} />
      </Col>
      <Col span={9}>{text}</Col>
      <Col span={9}>
        <Select style={{ width: '100%' }} value={color} onChange={handleColorChanged}>
          {colorOptions}
        </Select>
      </Col>
      <Col span={4}>
        <Button type="link" size="large" onClick={onDelete}>
          删除
        </Button>
        {/* <Button type="link" size="large" icon={<CloseOutlined />} onClick={onDelete} /> */}
      </Col>
    </Row>
  )
}

export default React.memo(TodoListItem)
