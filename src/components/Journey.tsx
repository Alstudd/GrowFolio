import React from 'react'
import { InfoIcon } from "lucide-react";
import CreateCourseForm from "../components/create/CreateCourseForm";


const Journey = () => {
  return (
    <div>
        <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
        <h1 className="text-3xl font-bold text-center sm:text-start sm:text-4xl">
          Generate your Journey
        </h1>
        <div className="flex p-4 mt-5 text-sm rounded-md border-none bg-secondary">
          <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
          <div>
            Want to learn something new from a bigger picture 
            Get an optimized roadmap just for you !!
          </div>
        </div>

        <CreateCourseForm />
      </div>
    </div>
  )
}

export default Journey