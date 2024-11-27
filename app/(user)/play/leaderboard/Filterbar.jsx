import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

function FilterBar({ onFilterChange }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 px-4"
    >
      <div className="w-full sm:flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search players..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
          />
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <select className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white pr-10 cursor-pointer text-sm md:text-base">
          <option>All Time</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
        
        <select className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white pr-10 cursor-pointer text-sm md:text-base">
          <option>All Difficulties</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
    </motion.div>
  );
}

export default FilterBar;