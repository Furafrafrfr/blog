import React from "react"
import Footer from "./footer"
import Header from "./header"

export default function Layout(props){
    return(
        <div className="wrapper">
            <Header selectedCategory={props.selectedCategory} onSelectedCategoryChange={props.onSelectedCategoryChange} reset={props.reset}/>
            <div className="main-content">
                {props.children}
                <Footer />
            </div>
        </div>
    )
}