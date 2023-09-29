import { getUid, getUsername } from "@/lib/utils";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { auth } from "../../firebase_app";



const Navbar = () => {
  const username = getUsername();
  const uid = getUid();
  const router = useRouter();
  return (
    <div className="py-5 flex justify-between items-center">
      <Link href={username && uid ? `/todo/${username}?uid=${uid}` : '/'}>
        <p className="text-xl tracking-wide font-bold font-sans">MY TODO</p>
      </Link>
      <LogOut className="cursor-pointer"
      onClick={() => { 
        signOut(auth);
        onAuthStateChanged(auth,(user) => {
          console.log(user);
        });
        router.push('/');
      }  
        }/>
    </div>
  )
}

export default Navbar