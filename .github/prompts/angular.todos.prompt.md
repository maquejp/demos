Create a responsive Todo web application using Angular (v19+) and Tailwind CSS with the following requirements:

From the base project created angular-todo-app in the folder frontend.

1. Core Features:
- Add new todos with title and optional description
- Mark todos as complete/incomplete
- Edit existing todos
- Delete todos
- Filter todos by status (All/Active/Completed)
- Persist todos in browser localStorage

2. Technical Specifications:
- Use Angular standalone components
- Do not use inline html templates
- Implement proper TypeScript interfaces
- Follow Angular best practices and style guide
- Ensure mobile-first responsive design
- Include proper error handling
- Avoid any prompts for the project creation when using the Angular CLI

3. Styling:
- Use Tailwind CSS 4.x for styling (No custom CSS)

4. Component Structure:
- TodoContainer (smart component)
- TodoList (presentation component)
- TodoItem (presentation component)
- TodoForm (presentation component)
- TodoFilter (presentation component)

5. State Management:
- Use Angular signals for state management
- Implement proper data flow using Input/Output decorators
- Create a TodoService for business logic

6. Acceptance Criteria:
- Application loads without errors
- All CRUD operations work as expected
- Data persists after page refresh
- UI is responsive across devices
- Code follows Angular coding standards
- Components are properly tested

7. Testing:
- Write unit tests for all components and services
- Use Angular testing utilities

Please provide a working implementation adhering to these specifications.