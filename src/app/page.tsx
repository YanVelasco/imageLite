'use client'

import { authService } from "@/resources/users/authentication.resource.service";
import Login from "@/app/login/page";
import Gallery from "@/app/gallery/page";

export default function Home() {

    const user = authService.getUserSessionToken();

    if(user){
        return <Gallery />
    }

  return (
    <Login />
  )
}
