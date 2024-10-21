import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignUpDialog() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-primary">Sign up</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">Email</Label>
          <Input id="email" type="email" className="col-span-3" placeholder="Email" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">Password</Label>
          <Input id="password" type="password" placeholder="Password" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="confirm-password" className="text-right">Confirm Password</Label>
          <Input id="confirm-password" type="password" placeholder="Confirm password" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Sign Up</Button>
      </DialogFooter>
    </DialogContent>
  )
}
