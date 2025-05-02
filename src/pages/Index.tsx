
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  const categories = [
    {
      title: "Python Fundamentals",
      description: "New to programming? Start here to learn the basics of Python programming - variables, functions, conditionals, and more.",
      path: "/fundamentals",
      color: "bg-blue-500",
      level: "Beginner"
    },
    {
      title: "Easy Problems",
      description: "Ready for a challenge? Practice with simple problems focusing on lists, strings, and basic algorithms.",
      path: "/easy",
      color: "bg-green-500",
      level: "Easy"
    },
    {
      title: "Medium Problems",
      description: "Build your problem-solving skills with more complex challenges involving multiple concepts.",
      path: "/medium",
      color: "bg-yellow-500", 
      level: "Intermediate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Python Learning Arena</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Master Python programming through interactive challenges - from basics to advanced concepts.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link to={category.path} key={index} className="block">
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className={`${category.color} text-white rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">
                      {category.level}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-sm font-medium">Start Learning</span>
                  <ChevronRight className="h-5 w-5" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">About This Learning Platform</h2>
          <p className="mb-4">
            This platform is designed to help you learn Python programming from scratch, with a focus on understanding the fundamentals first before tackling more complex problems.
          </p>
          <p className="mb-4">
            Each challenge comes with:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
            <li>Clear problem descriptions</li>
            <li>Example inputs and outputs</li>
            <li>Starter code to help you begin</li>
            <li>Step-by-step explanations of solutions</li>
            <li>Automated tests to verify your solutions</li>
          </ul>
          <p>
            Start with the Python Fundamentals section if you're new to programming, or jump straight to Easy Problems if you're familiar with basic concepts.
          </p>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          Python Learning Arena - Master Python programming through practice
        </div>
      </footer>
    </div>
  );
};

export default Index;
