import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const Header: React.FC = () => {
  const { currentUser, logout } = useUser();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-600"
              >
                <rect
                  x="4"
                  y="2"
                  width="16"
                  height="20"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M8 2V4H16V2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 10H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 14H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 18H13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h1 className="text-xl font-bold text-gray-900">Tasks Manager</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-1">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              {currentUser && (
                <div className="hidden sm:flex items-center gap-3">
                  <img
                    src={
                      currentUser?.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`
                    }
                    alt={currentUser?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {currentUser?.role}
                    </p>
                  </div>

                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                    title="Logout"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
