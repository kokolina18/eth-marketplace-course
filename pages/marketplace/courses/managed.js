
import { useState } from "react";
import { useAccount, useManagedCourses } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard, OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";

export default function ManagedCourses() {
  const [email, setEmail] = useState('')
  const { account } = useAccount()
  const { managedCourses } = useManagedCourses(account.data)   
  const verifyCourse = (email, {hash, proof}) => {
     console.log(email, hash, proof)
  }
  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
      
      {
        managedCourses.data?.map( course=>
         
          <ManagedCourseCard
            key={course.ownedCourseId}
            course={course}>
            <div className="relative flex mr-2 rounded-md">
            <input
              value={email}
              onChange={ ({target: {value}}) => setEmail(value)}
              type="text"
              name="account"
              id="account"
              className="block p-4 border-gray-300 rounded-md shadow-md w-96 focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
              placeholder="0x2341ab..." />
            <Button
              onClick={()=>{
                  verifyCourse(email, { 
                    hash: course.hash, proof: course.proof
                })
              }}>
              Verify
            </Button>
          </div>
          </ManagedCourseCard>
        )
      }
      </section>
    </>
  )
}

ManagedCourses.Layout = BaseLayout
