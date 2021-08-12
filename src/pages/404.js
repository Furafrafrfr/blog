import { Link, navigate } from "gatsby"
import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"

export default function NotFound({ location }) {
  let handleSelectedCategoryChange = cat => {
    navigate("/", {})
  }
  return (
    <React.Fragment>
      <Head title="404" />
      <h1>Page Not Found</h1>
      <p>指定されたURL"{location.href}"は見つかりませんでした。</p>
      <Link to="/">ホームへ移動する</Link>
    </React.Fragment>
  )
}
