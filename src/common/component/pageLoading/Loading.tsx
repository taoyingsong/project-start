import React from 'react'
import { Col, Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './Loading.module.less'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const Loading = () => (
  <Row className={styles.loadingRow}>
    <Col span={24}>
      <Spin indicator={antIcon} />
    </Col>
  </Row>
)
export default React.memo(Loading)
