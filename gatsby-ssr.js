//import "bootstrap/dist/js/bootstrap.min.js";
//import "@popperjs/core/dist/umd/popper.min.js";
import React from 'react'
import Layout from './src/components/core/layout'


export const wrapPageElement = ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return <Layout {...props}>{element}</Layout>
}
