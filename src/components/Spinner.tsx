import React from 'react'

type SpinnerType = {
    width: string,
}

const Spinner = ({ width }: SpinnerType) => {
  return (
    <div className='spinner' style={{ width: width, height: width }} />
  )
}

export default Spinner