const Item = ({title, value}) => {
  return (
    <div className="px-4 py-5 bg-gray-50 sm:px-6">
      <div className="text-sm font-medium text-gray-500">
        {title}
      </div>
      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </div>
    </div>
  )
}

export default function ManagedCourseCard({children, course}) { 
  
  return (
    <div className="mb-3 overflow-hidden bg-white border shadow sm:rounded-lg">
      <div className="flex-1 border-t border-gray-200">
        <Item title='Course ID' value={course.ownedCourseId}/>
        <Item title='Proof' value={course.proof}/>
        <div className="px-4 py-5 bg-white sm:px-6">
          {children}
        </div> 
      </div>
    </div>
  )
}
