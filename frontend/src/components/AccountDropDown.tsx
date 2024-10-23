import React, { useContext, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import SignInDialog from '@/components/SignInDialog.tsx';
import { SignUpDialog } from '@/components/SignUpDialog.tsx';
import { AuthContext } from '@/context/AuthProvider';

// Note: Shadcn/Radix UI have issues dealing with multiple dialogs within a dropdown menu
// props to the guy below for the workaround
// https://github.com/shadcn-ui/ui/issues/1011#issuecomment-1930103090
enum Dialogs { signUpDialog, signInDialog}

function AccountDropDown() {
  // Used to toggle the sign in state for now
  const { user,  signOut } = useContext(AuthContext);
  const [dialog, setDialog] = useState(Dialogs.signUpDialog);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Function meant to be used by the forms to autoclose on successful sign in
  const closeDialog = () => {
    setDialogOpen(prevOpen => !prevOpen);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User className="text-primary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user ? (
            <React.Fragment>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2" onClick={signOut}>
                <LogOut className="size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DialogTrigger asChild onClick={() => setDialog(Dialogs.signUpDialog)}>
                <DropdownMenuItem className="flex items-center gap-2">
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
        ? <SignUpDialog closeDialog={closeDialog} />
        : <SignInDialog closeDialog={closeDialog} />
      }
    </Dialog>
  );
}

export default AccountDropDown;
