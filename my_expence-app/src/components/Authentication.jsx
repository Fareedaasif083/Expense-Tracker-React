import { useState } from "react" 
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog" 
import Login from "./Login" 
import Signup from "./signup"

export default function Authentication ({setUser}) {
  const [showSignup,setShowSignup]=useState(false);

  const handleSuccessLogin=(user)=>{
    setUser(user);
  }
  const handleSuccessSignup=(user)=>{
    setUser(user);
  }
  

  return(
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-slate-500 text-white rounded-4xl px-4 py-3">Signup/Login</button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gray-800 text-white rounded-lg p-4">
        {showSignup ?( 
         <>
           <Signup signupSuccess= {handleSuccessSignup} onFlip={() => setShowSignup(false)}/>
         </>
      ):(
      <>
           <Login loginSuccess= {handleSuccessLogin} onFlip={() => setShowSignup(true)}/>
         </>
      )}
      </DialogContent>
    </Dialog>
    );
}



