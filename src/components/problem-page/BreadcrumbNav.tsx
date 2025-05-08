
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  difficulty?: string;
  currentProblemIndex?: number;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  items,
  difficulty, 
  currentProblemIndex 
}) => {
  // Support for both the new items-based approach and the legacy approach
  if (items && items.length > 0) {
    return (
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  
  // Legacy support for direct difficulty/problem index pattern
  if (difficulty && currentProblemIndex !== undefined) {
    const difficultyLower = difficulty.toLowerCase();
    
    return (
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/${difficultyLower}`}>{difficulty} Problems</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              Problem {currentProblemIndex + 1}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  
  return null;
};

export default BreadcrumbNav;
