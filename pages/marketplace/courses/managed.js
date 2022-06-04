
import { useState } from "react";
import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { Button, Message } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers"  

const VerificationInput = ({onVerify}) => { 
  const [email, setEmail] = useState('')
  return (
    <div className="relative flex mr-2 rounded-md">
      <input
        value={email}
        onChange={ ({target: {value}}) => setEmail(value) }
        type="text"
        name="account"
        id="account"
        className="block p-4 border-gray-300 rounded-md shadow-md w-96 focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
        placeholder="0x2341ab..." />
      <Button
        onClick={()=>{
          onVerify(email)
        }}>
        Verify
      </Button>
    </div>
  )
} 

export default function ManagedCourses() {
  const [proofedOwnership, setProofedOwnership] = useState({})
  const { web3 } = useWeb3()
  const { account } = useAdmin({redirectTo: '/marketplace'})
  const { managedCourses } = useManagedCourses(account)   
  
  const verifyCourse = (email, {hash, proof}) => {
    const emailHash = web3.utils.sha3(email)
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    )

    proofToCheck === proof ?
      setProofedOwnership({
        ...proofedOwnership,
        [hash]: true
      }) :
      setProofedOwnership({
        ...proofedOwnership,
        [hash]: false
      })
  }

  if( !account.isAdmin){
    return null
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
            <VerificationInput 
              onVerify={(email)=>{
                verifyCourse(email, {hash: course.hash, proof: course.proof})
              }}/>
           
          {
            proofedOwnership[course.hash] &&
            <div>
              <Message className='mt-2'>
                Verified!
              </Message>
            </div>
          }
          {
            proofedOwnership[course.hash] === false &&
            <div>
              <Message type='danger' className='mt-2'>
                Wrong Proof!
              </Message>
            </div>
          }
          </ManagedCourseCard>
        )
      }
      </section>
    </>
  )
}

ManagedCourses.Layout = BaseLayout
