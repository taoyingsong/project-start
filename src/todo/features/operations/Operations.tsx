import React, { useState } from 'react'
import { Checkbox, Radio } from 'antd'
import { useAppDispatch } from '../../common/hooks/reactRedux'
import { colorOptions } from '../filters/colors'
import { colorsFilterChanged, statusFilterChanged, StatusFilters, CheckboxValueType } from '../filters/filtersSlice'
import styles from './Operations.module.less'
import './Operations.less'

// eslint-disable-next-line no-unused-vars
const StatusFilter = ({ onChange }: { onChange: (status: string) => void }) => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const renderedFilters = Object.keys(StatusFilters).map(key => {
    // @ts-ignore
    const value = StatusFilters[key]
    return (
      <Radio.Button key={value} value={value}>
        {key}
      </Radio.Button>
    )
  })
  return (
    <>
      <span>状态过滤: </span>
      <Radio.Group
        value={selectedStatus}
        onChange={e => {
          const seleted = e.target.value
          setSelectedStatus(seleted)
          onChange(seleted)
        }}
        size="large"
      >
        {renderedFilters}
      </Radio.Group>
    </>
  )
}

// eslint-disable-next-line no-unused-vars
const ColorFilters = ({ onChange }: { onChange: (colors: CheckboxValueType[]) => void }) => {
  return (
    <div className={styles.colorFilter}>
      <span>颜色过滤: </span>
      <Checkbox.Group options={colorOptions} onChange={onChange} className="checkbox-group" />
    </div>
  )
}

const Operations = () => {
  const dispatch = useAppDispatch()

  const onColorChange = (colors: CheckboxValueType[]) => dispatch(colorsFilterChanged(colors))
  const onStatusChange = (status: string) => dispatch(statusFilterChanged(status))

  return (
    <section className="todo-operation">
      <StatusFilter onChange={onStatusChange} />
      <ColorFilters onChange={onColorChange} />
    </section>
  )
}

export default React.memo(Operations)
