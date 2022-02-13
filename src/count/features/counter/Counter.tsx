import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../common/hooks/reactRedux'
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice'
import styles from './Counter.module.less'

export const Counter = () => {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div className={styles.row}>
        <button type="button" className={styles.button} onClick={() => dispatch(decrement())}>
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button type="button" className={styles.button} onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <div className={styles.row}>
        <input className={styles.textbox} value={incrementAmount} onChange={e => setIncrementAmount(e.target.value)} />
        <button type="button" className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
          同步增加步长数量
        </button>
        <button type="button" className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>
          异步增加步长数量
        </button>
        <button type="button" className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          奇数时增加步长数量
        </button>
      </div>
      <div className={styles.row}>
        <button type="button" className={styles.button} onClick={() => dispatch(reset())}>
          重置
        </button>
      </div>
    </div>
  )
}
