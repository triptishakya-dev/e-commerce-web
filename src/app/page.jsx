import CategorySection from '@/components/(frontend)/CategorySection'
import HeroSection from '@/components/(frontend)/HeroSection'
import RatingSection from '@/components/(frontend)/RatingSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <CategorySection/>
      <RatingSection/>
    </div>
  )
}

export default page