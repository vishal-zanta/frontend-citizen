import clsx from 'clsx'
import React from 'react'

type Props = {
    children : React.ReactNode, 
    className ?: string,
}

const CenterLayout = ({children, className}: Props) => {
  return (
    <div className={clsx("max-w-6xl mx-auto ", className)}>
        {children}
    </div>
  )
}

export default CenterLayout