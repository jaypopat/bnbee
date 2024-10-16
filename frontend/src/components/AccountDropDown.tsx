import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';

function AccountDropDown() {
  // Used to toggle the sign in state for now
  const [signedIn, setSignedIn] = useState(false);

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User className="text-primary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          {signedIn ? (
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
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setSignedIn(false)}>
                <LogOut className="size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setSignedIn(true)}>
                <User className="size-4" />
                <span>Sign Up</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2" onClick={() => setSignedIn(true)}>
                <User className="size-4" />
                <span>Sign In</span>
              </DropdownMenuItem>
            </React.Fragment>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  );
}

export default AccountDropDown;
