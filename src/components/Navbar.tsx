import Link from "next/link"

const Navbar = () => {
  return (
    <div className="m-4">
      <Link href={``}>
        <p className="text-xl tracking-wide font-bold font-sans">MY TODO</p>
      </Link>
    </div>
  )
}

export default Navbar