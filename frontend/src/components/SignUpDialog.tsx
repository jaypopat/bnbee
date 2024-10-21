import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuth from '@/context/AuthProvider';
import { useState } from 'react';

export function SignUpDialog() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useAuth();


  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    const success = await signUp(email, password);
    if (success) {
      console.log("Signed up successfully");
    } else {
      console.log("Failed to sign up");
    }
  };


  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-primary">Sign up</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">Email</Label>
          <Input id="email" type="email" className="col-span-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">Password</Label>
          <Input id="password" type="password" placeholder="Password" className="col-span-3" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="confirm-password" className="text-right">Confirm Password</Label>
          <Input id="confirm-password" type="password" placeholder="Confirm password" className="col-span-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSignUp}>Sign Up</Button>
      </DialogFooter>
    </DialogContent>
  )
}
