/// <reference types="react-scripts" />

declare module '*.less' {
  const content: { [className: string]: string }
  export default content
}
declare module '*.svg' {
  // import React from 'react'

  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  // const content: string
  const content: any // string也行，保险起见就写成any吧
  export default content
}
