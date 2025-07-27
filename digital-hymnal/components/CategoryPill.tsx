
import React from 'react';
import { Category } from '../types';

interface CategoryPillProps {
  category: Category;
  onClick?: () => void;
  className?: string;
}

const categoryColors: Record<Category, string> = {
  [Category.Praise]: "bg-green-100 text-green-800",
  [Category.Worship]: "bg-blue-100 text-blue-800",
  [Category.Communion]: "bg-purple-100 text-purple-800",
  [Category.Advent]: "bg-indigo-100 text-indigo-800",
  [Category.Christmas]: "bg-red-100 text-red-800",
  [Category.Epiphany]: "bg-yellow-100 text-yellow-800",
  [Category.LentAndCross]: "bg-gray-100 text-gray-800",
  [Category.EasterAndAscension]: "bg-yellow-100 text-yellow-800",
  [Category.Pentecost]: "bg-orange-100 text-orange-800",
  [Category.Trinity]: "bg-blue-200 text-blue-900",
  [Category.Life]: "bg-teal-100 text-teal-800",
  [Category.Guidance]: "bg-cyan-100 text-cyan-800",
  [Category.Hope]: "bg-pink-100 text-pink-800",
  [Category.Songs]: "bg-gray-200 text-gray-900",
  [Category.Special]: "bg-purple-200 text-purple-900",
  [Category.Redeemer]: "bg-red-200 text-red-900",
};

const CategoryPill: React.FC<CategoryPillProps> = ({ category, onClick, className }) => {
  const colorClasses = categoryColors[category] || "bg-gray-100 text-gray-800";
  const buttonClasses = `text-xs font-medium px-2.5 py-0.5 rounded-full transition-transform transform hover:scale-105 ${colorClasses} ${className || ''}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={buttonClasses}>
        {category}
      </button>
    );
  }

  return (
    <span className={buttonClasses}>
      {category}
    </span>
  );
};

export default CategoryPill;