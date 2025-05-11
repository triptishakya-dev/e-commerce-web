import CategorySection from '@/components/(frontend)/CategorySection'
import HeroSection from '@/components/(frontend)/HeroSection'
import ProductSection from '@/components/(frontend)/ProductSection'
import RatingSection from '@/components/(frontend)/RatingSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <CategorySection/>
      <ProductSection/>
      <RatingSection/>
    </div>
  )
}

export default page