import NewBalanceForm from '@/components/NewBalanceForm/NewBalanceForm'
import React from 'react'

const inputPage = () => {
  return (
    <div className="flex-col justify-center py-20">
        <h2 className="text-center text-2xl font-bold">収支登録</h2>
        <NewBalanceForm />
    </div>
  )
}

export default inputPage