import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import SignInDialog from '@/components/SignInDialog.tsx';
import { SignUpDialog } from '@/components/SignUpDialog.tsx';

// Note: Shadcn/Radix UI have issues dealing with multiple dialogs within a dropdown menu
// props to the guy below for the workaround
// https://github.com/shadcn-ui/ui/issues/1011#issuecomment-1930103090
enum Dialogs { signUpDialog, signInDialog }

function AccountDropDown() {
  // Used to toggle the sign in state for now
  const [signedIn, setSignedIn] = useState(false);
  const [dialog, setDialog] = useState(Dialogs.signUpDialog);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User className="text-primary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {signedIn ? (
            <React.Fragment>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={'/account'}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="size-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link to={'/bookings'}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>Bookings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setSignedIn(false)}>
                <LogOut className="size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DialogTrigger asChild onClick={() => setDialog(Dialogs.signUpDialog)}>
                <DropdownMenuItem className="flex items-center gap-2" >
                  <User className="size-4" />
                  <span>Sign Up</span>
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger asChild onClick={() => setDialog(Dialogs.signInDialog)}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="size-4" />
                  <span>Sign In</span>
                </DropdownMenuItem>
              </DialogTrigger>

            </React.Fragment>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {dialog === Dialogs.signUpDialog
        ? <SignUpDialog />
        : <SignInDialog />
      }
    </Dialog>
  );
}

export default AccountDropDown;
