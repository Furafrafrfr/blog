import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Head } from "./common/head"
import { Header } from "./common/header"
import { Footer } from "./common/footer"
import { useCategory } from "../hooks/categoryState"
import { getMapKeys } from "../util/mapUtil"

export const App = ({ children, pageData, siteData, avatar }) => {
  const data = useStaticQuery(graphql`
    {
      blogContext {
        category
      }
    }
  `)

  const [category, setCategory] = useCategory()
  
  useEffect(() => {
    if (category.size === 0) {
      data.blogContext.category.forEach(category =>
        setCategory(category, false)
      )
    }
  }, [])

  return (
    <>
      <Head pageData={pageData} siteData={siteData} avatar={avatar} />
      <div className="wrapper">
        <Header />
        <div className="main-content">
          {children}
          <Footer />
        </div>
      </div>
    </>
  )
}
