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

function AccountDropDown() {
  // Used to toggle the sign in state for now
  const [signedIn, setSignedIn] = useState(false);

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User className="text-primary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {signedIn ? (
            <React.Fragment>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={"/account"}>
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              </Link>
              <Link to={"/bookings"}>
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
