-- Mock data for tasks table

INSERT INTO tasks (title, description, status, priority, due_date, start_date, end_date, tags, project_id, created_by, updated_by, created_at, updated_at) VALUES
('Design new dashboard UI', 'Create a modern and responsive dashboard layout with improved user experience', 'in-progress', 'high', NOW() + INTERVAL '7 days', NOW() - INTERVAL '5 days', NULL, ARRAY['design', 'ui', 'frontend'], 1, 1, 2, NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day'),
('Implement authentication', 'Set up JWT-based authentication and authorization system', 'in-progress', 'high', NOW() + INTERVAL '14 days', NOW() - INTERVAL '10 days', NULL, ARRAY['backend', 'security', 'api'], 1, 2, 2, NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),
('Database optimization', 'Optimize slow queries and add appropriate indexes', 'todo', 'medium', NOW() + INTERVAL '21 days', NULL, NULL, ARRAY['database', 'performance', 'backend'], NULL, 4, 4, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('Write API documentation', 'Complete API documentation with examples and use cases', 'completed', 'medium', NOW() - INTERVAL '5 days', NOW() - INTERVAL '20 days', NOW() - INTERVAL '5 days', ARRAY['documentation', 'api', 'backend'], 1, 2, 2, NOW() - INTERVAL '20 days', NOW() - INTERVAL '5 days'),
('Setup CI/CD pipeline', 'Configure GitHub Actions for automated testing and deployment', 'completed', 'high', NOW() - INTERVAL '2 days', NOW() - INTERVAL '30 days', NOW() - INTERVAL '2 days', ARRAY['devops', 'ci-cd', 'deployment'], 2, 1, 1, NOW() - INTERVAL '30 days', NOW() - INTERVAL '2 days'),
('Fix login form validation', 'Add proper validation and error messages to the login form', 'todo', 'medium', NOW() + INTERVAL '3 days', NULL, NULL, ARRAY['bug', 'frontend', 'validation'], NULL, 3, 3, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
('Create task filtering feature', 'Implement advanced filtering by status, priority, and tags', 'in-progress', 'high', NOW() + INTERVAL '10 days', NOW() - INTERVAL '4 days', NULL, ARRAY['feature', 'frontend', 'ui'], 1, 5, 3, NOW() - INTERVAL '4 days', NOW() - INTERVAL '6 hours'),
('Update user profile page', 'Redesign and update user profile with new fields', 'todo', 'low', NOW() + INTERVAL '30 days', NULL, NULL, ARRAY['ui', 'frontend', 'enhancement'], NULL, 6, 6, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('Add unit tests', 'Write unit tests for core business logic', 'in-progress', 'medium', NOW() + INTERVAL '12 days', NOW() - INTERVAL '8 days', NULL, ARRAY['testing', 'backend', 'quality'], 2, 2, 2, NOW() - INTERVAL '8 days', NOW() - INTERVAL '4 hours'),
('Email notification service', 'Implement email notifications for task updates', 'todo', 'medium', NOW() + INTERVAL '18 days', NULL, NULL, ARRAY['feature', 'backend', 'notifications'], 2, 4, 4, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('Refactor authentication module', 'Clean up and refactor the authentication module for better maintainability', 'completed', 'medium', NOW() - INTERVAL '10 days', NOW() - INTERVAL '25 days', NOW() - INTERVAL '10 days', ARRAY['refactor', 'backend', 'code-quality'], 1, 2, 2, NOW() - INTERVAL '25 days', NOW() - INTERVAL '10 days'),
('Create mobile responsive design', 'Ensure all components are mobile responsive', 'in-progress', 'high', NOW() + INTERVAL '5 days', NOW() - INTERVAL '3 days', NULL, ARRAY['design', 'frontend', 'mobile'], 1, 5, 5, NOW() - INTERVAL '3 days', NOW() - INTERVAL '12 hours'),
('Setup monitoring and logging', 'Configure application monitoring and centralized logging', 'todo', 'high', NOW() + INTERVAL '12 days', NULL, NULL, ARRAY['devops', 'monitoring', 'backend'], NULL, 1, 1, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
('Performance testing', 'Run performance and load testing on the application', 'cancelled', 'low', NOW() - INTERVAL '2 days', NOW() - INTERVAL '15 days', NOW() - INTERVAL '2 days', ARRAY['testing', 'performance', 'qa'], 2, 3, 3, NOW() - INTERVAL '15 days', NOW() - INTERVAL '2 days'),
('User onboarding tutorial', 'Create an interactive onboarding tutorial for new users', 'todo', 'medium', NOW() + INTERVAL '25 days', NULL, NULL, ARRAY['feature', 'frontend', 'ux'], 1, 6, 6, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- Mock data for task_assignments table
INSERT INTO task_assignments (task_id, user_id) VALUES
(1, 3), -- Design task assigned to Carol
(1, 5), -- Design task also assigned to Emma
(2, 2), -- Auth task assigned to Bob
(2, 4), -- Auth task also assigned to David
(2, 7), -- Auth task also assigned to Grace
(4, 2), -- Documentation assigned to Bob
(4, 6), -- Documentation also assigned to Frank
(5, 1), -- CI/CD assigned to Alice
(5, 8), -- CI/CD also assigned to Henry
(7, 5), -- Filtering feature assigned to Emma
(7, 3), -- Filtering feature also assigned to Carol
(9, 2), -- Unit tests assigned to Bob
(10, 4), -- Email service assigned to David
(10, 7), -- Email service also assigned to Grace
(11, 2), -- Auth refactor assigned to Bob
(12, 5), -- Mobile design assigned to Emma
(14, 3), -- Performance testing assigned to Carol
(15, 6); -- Onboarding assigned to Frank
