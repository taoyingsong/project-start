import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      <h2>什么也没有</h2>
      <p>
        <Link to="/">跳转到主页</Link>
      </p>
    </div>
  )
}

export default React.memo(NoMatch)
