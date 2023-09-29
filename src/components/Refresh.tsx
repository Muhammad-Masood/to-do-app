import { useRouter } from "next/navigation"
import { useEffect } from "react";


export const Refresh = () => {
    const router = useRouter();
  useEffect(() => {
    router.refresh();
  },[]);
    return (
    <>
    </>
  )
}
