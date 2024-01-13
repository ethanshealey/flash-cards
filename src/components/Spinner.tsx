import React from 'react'

type SpinnerType = {
    width: string,
    thickness?: string
}

const Spinner = ({ width, thickness }: SpinnerType) => {
  return (
    <div className='spinner' style={{ width: width, height: width, border: `${thickness ? thickness : '3px'} solid rgba(255,255,255,.3)`, borderTopColor: "#fff" }} />
  )
}

export default Spinner