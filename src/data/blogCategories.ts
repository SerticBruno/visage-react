export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'new-blogs',
    name: 'New Blogs',
    description: 'Najnoviji članci i vijesti',
    color: '#3B82F6' // blue
  },
  {
    id: 'recent',
    name: 'Recent',
    description: 'Nedavno objavljeni članci',
    color: '#10B981' // green
  },
  {
    id: 'old',
    name: 'Old',
    description: 'Stariji članci i arhiva',
    color: '#6B7280' // gray
  }
];

export const getCategoryById = (id: string): BlogCategory | undefined => {
  return blogCategories.find(category => category.id === id);
};

export const getCategoryByName = (name: string): BlogCategory | undefined => {
  return blogCategories.find(category => category.name === name);
}; 