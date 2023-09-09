
const page = ({params}:{params:{username:string}}) => {
  return (
    <div>
        <p className="font-bold text-3xl tracking-wide">Welcome {params.username}!</p>
    </div>
  )
}

export default page