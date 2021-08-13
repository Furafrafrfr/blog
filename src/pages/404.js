import { Link } from "gatsby"
import React from "react"
import Head from "../components/head"

export default function NotFound({ location }) {
  return (
    <React.Fragment>
      <Head title="404" />
      <h1>Page Not Found</h1>
      <p>指定されたURL"{location.href}"は見つかりませんでした。</p>
      <Link to="/">ホームへ移動する</Link>
    </React.Fragment>
  )
}
