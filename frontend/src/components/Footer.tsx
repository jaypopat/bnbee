import { Facebook, Instagram, TwitterIcon } from 'lucide-react';

function Footer() {
  return (
    <div className="relative w-full pt-16">
      <div className="flex">
        {/* Logo */}
        <div className="flex justify-start mr-8">
          <h1 className="text-4xl leading-9 font-semibold text-primary">BnBee</h1>
        </div>
        {/* Support */}
        <div className="w-full flex justify-around">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Support</h1>
            <ol className="flex flex-col items-start gap-4">
              <li>Help centre</li>
              <li>AirCover</li>
              <li>Anti-Discrimination</li>
              <li>Disability Support</li>
              <li>Report neighborhood concern</li>
            </ol>
          </div>
          {/* Hosting */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Hosting</h1>
            <ol className="flex flex-col items-start gap-4">
              <li>BnBee your home</li>
              <li>AirCover for Hosts</li>
              <li>Hosting resources</li>
              <li>Community forum</li>
              <li>Join a free Hosting class</li>
            </ol>
          </div>
          {/* About */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">About</h1>
            <ol className="flex flex-col items-start gap-4">
              <li>Newsroom</li>
              <li>New Features</li>
              <li>Careers</li>
              <li>Investors</li>
            </ol>
          </div>
        </div>
      </div>
      {/* Socials */}
      <div className="pt-32 flex flex-col">
        <div className="h-0.5 bg-muted-foreground/20" />
        <div className="flex flex-row justify-between items-center py-3">
          <span>&copy; 2024 BnBee, Inc. · Privacy · Terms · Sitemap · Company details</span>
          <div className="flex flex-row gap-4">
            <Facebook className="hover:text-primary hover:cursor-pointer" />
            <TwitterIcon className="hover:text-primary hover:cursor-pointer" />
            <Instagram className="hover:text-primary hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
