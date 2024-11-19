import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <BannerProduct/>
      <CategoryList/>
      <HorizontalCardProduct category={"Laptop"} heading={"Best Laptop"}/>
      <HorizontalCardProduct category={"Case"} heading={"Popular's Case"}/>


      <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"Keyboard"} heading={"Keyboard"}/>
      <VerticalCardProduct category={"Monitor"} heading={"Monitor"}/>

   
    </div>
  )
}

export default Home