import React from 'react'
import { Alert } from '@mantine/core'
export const AlertLayout = (children:string) => {
  return (
    <>
    <Alert>{children}</Alert>
    </>
  )
}
