import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import useAuth from '@/context/AuthProvider';

interface SignUpDialogPropsT {
  closeDialog: () => void
}

export default function SignInDialog({closeDialog}: SignUpDialogPropsT) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    const success = await signIn(email, password);
    if (success) {
      closeDialog();
    }
  }

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input id="email" type="email" placeholder="Email" className="col-span-3" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">Password</Label>
            <Input type="password" id="password" className="col-span-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSignIn}>Sign in</Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
