import Link from 'next/link'
import React from 'react'
import { TfiPlus } from 'react-icons/tfi'
const AddDeckSkeleton = () => {
  return (
    <Link href="/create" className="add-item">
        <TfiPlus />
    </Link>
  )
}

export default AddDeckSkeleton