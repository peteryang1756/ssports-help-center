import React from 'react'
import Footer from '@theme-original/Footer'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { MendableFloatingButton } from '@mendable/search'

export default function FooterWrapper(props) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext()
  const icon = <img src="https://88ij.vercel.app/1000001111-removebg-preview.png?text=Logo" />
  const popupText = "詢問任何問題?"
  const welcomeMessage = "任何需要幫雙龍體育協助嗎?"

  return (
    <>
      <MendableFloatingButton icon={icon} popupText={popupText} welcomeMessage={welcomeMessage} anon_key='d24adf46-bada-44ef-a25b-94d01fe6fb3e' />
      <Footer {...props} />
    </>
  )
}
