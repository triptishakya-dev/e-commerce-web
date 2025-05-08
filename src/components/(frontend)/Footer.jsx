import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-black text-white px-6 py-12"
    >
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold">MyWebsite</h2>
          <p className="text-sm text-neutral-400 mt-2">Crafted with love & React</p>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <p className="font-medium">Quick Links</p>
          <Separator className="bg-neutral-700" />
          <ul className="space-y-1 text-sm text-neutral-400">
            <li><Link href={"/"} className="hover:underline hover:text-white" >Home</Link></li>
            <li><Link href={"/AboutUs"} className="hover:underline hover:text-white" >About</Link></li>
            <li><Link href={"/Services"} className="hover:underline hover:text-white" >Services</Link></li>
            
            
            <li><Link href={"/ContactUs"} className="hover:underline hover:text-white" >Contact</Link></li>
            
          </ul>
        </div>

        {/* Social + Button */}
        <div className="space-y-4">
          <p className="font-medium">Follow Us</p>
          <div className="flex justify-center md:justify-start gap-4 text-xl text-neutral-400">
            <FaFacebookF className="hover:text-white transition" />
            <FaTwitter className="hover:text-white transition" />
            <FaInstagram className="hover:text-white transition" />
            <FaGithub className="hover:text-white transition" />
          </div>
          <Button variant="outline" className="border-neutral-500 text-white hover:bg-neutral-800">
            Subscribe
          </Button>
        </div>
      </div>

      <Separator className="bg-neutral-700 my-8" />
      <p className="text-center text-sm text-neutral-400">© 2025 MyWebsite. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
