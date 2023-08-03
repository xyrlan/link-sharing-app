import React from 'react'

const loading = () => {
  return (
    <div className="flex items-center w-full justify-center gap-2">
                    <div className="h-6 w-6 rounded-full border-4 border-t-transparent border-l-transparent animate-spin border-indigo-600" />
                    <p className='text-black'>Processing...</p>
                </div>
  )
}

export default loading