
import { Link, useLocation } from "react-router-dom";
import { Settings, User, FileText, Star } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 px-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link to="/teddy" className={`flex flex-col items-center p-2 ${isActive('/teddy') ? 'text-accent' : 'text-gray-500'}`}>
          <Star className="w-6 h-6" />
          <span className="text-xs">Play</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive('/profile') ? 'text-accent' : 'text-gray-500'}`}>
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </Link>
        <Link to="/logs" className={`flex flex-col items-center p-2 ${isActive('/logs') ? 'text-accent' : 'text-gray-500'}`}>
          <FileText className="w-6 h-6" />
          <span className="text-xs">Logs</span>
        </Link>
        <Link to="/settings" className={`flex flex-col items-center p-2 ${isActive('/settings') ? 'text-accent' : 'text-gray-500'}`}>
          <Settings className="w-6 h-6" />
          <span className="text-xs">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
