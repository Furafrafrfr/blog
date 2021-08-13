import React from "react"
import Footer from "./footer"
import Header from "./header"

export default function Pagegit(props) {
  return (
    <div className="wrapper">
      <Header />
      <div className="main-content">
        {props.children}
        <Footer />
      </div>
    </div>
  )
}
