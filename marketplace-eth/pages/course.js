import Modal from "@components/common/modal"
import { Keypoints } from "@components/course"
import Curriculum from "@components/course/curriculum"
import Hero from "@components/course/hero"

export default function Course() {

  
  
    return (
      <>
        <Hero />
        <Keypoints/>
        <Curriculum />
  
    
        <Modal />
        </>
    )
  }