import { Heart } from 'lucide-react';
import AccountDropDown from '@/components/AccountDropDown';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary-foreground rounded-3xl h-auto shadow-lg flex items-center py-4 px-6">
      <div className="flex justify-between w-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <span className="text-3xl font-semibold text-primary leading-9">BnBee</span>
          </Link>
        </div>
        {/* Icons */}
        <div className="flex items-center gap-4">
          <Heart className="text-primary" />
          <AccountDropDown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
