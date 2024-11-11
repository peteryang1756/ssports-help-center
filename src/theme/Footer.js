import React from 'react'
import Footer from '@theme-original/Footer'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { MendableFloatingButton } from '@mendable/search'

export default function FooterWrapper(props) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()
  const icon = <img src="https://88ij.vercel.app/1000001111-removebg-preview.png?text=Logo" />


  return (
    <>
      <MendableFloatingButton anon_key={customFields.mendableAnonKey} />
      <Footer {...props} />
    </>
  )
}
