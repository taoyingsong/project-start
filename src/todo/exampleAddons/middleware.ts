// eslint-disable-next-line no-unused-vars
export const print1 = () => (next: (arg0: any) => any) => (action: any) => {
  console.log('1')
  return next(action)
}

// eslint-disable-next-line no-unused-vars
export const print2 = () => (next: (arg0: any) => any) => (action: any) => {
  console.log('2')
  return next(action)
}

// eslint-disable-next-line no-unused-vars
export const print3 = () => (next: (arg0: any) => any) => (action: any) => {
  console.log('3')
  return next(action)
}
