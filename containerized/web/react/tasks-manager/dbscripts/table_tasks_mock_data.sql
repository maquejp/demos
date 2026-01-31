-- Mock data for tasks table

INSERT INTO tasks (id, title, description, status, priority, due_date, start_date, end_date, tags, project_id, created_by, updated_by, created_at, updated_at) VALUES
(1, 'Initial Planning & Requirements Gathering', 'Meet with stakeholders to gather requirements and create project plan', 'completed', 'high', '2025-01-09T00:00:00.000Z', '2025-01-03T00:00:00.000Z', '2025-01-07T00:00:00.000Z', ARRAY['planning', 'requirements'], 1, 1, 1, '2025-01-03T00:00:00.000Z', '2025-01-07T00:00:00.000Z'),
(2, 'UI/UX Design & Mockups', 'Create wireframes, user flows, and high-fidelity mockups', 'in-progress', 'medium', '2025-01-24T00:00:00.000Z', '2025-01-10T00:00:00.000Z', NULL, ARRAY['design', 'ui/ux', 'mockups'], NULL, 1, 1, '2025-01-09T00:00:00.000Z', '2025-01-15T00:00:00.000Z'),
(3, 'Frontend Development - Homepage', 'Build responsive homepage with modern design patterns', 'todo', 'low', '2025-01-31T00:00:00.000Z', NULL, NULL, ARRAY['frontend', 'react', 'responsive'], 1, 1, 1, '2025-01-14T00:00:00.000Z', '2025-01-14T00:00:00.000Z'),
(4, 'Frontend Development - Internal Pages', 'Develop about, contact, and services pages', 'todo', 'medium', '2025-02-07T00:00:00.000Z', NULL, NULL, ARRAY['frontend', 'pages'], 1, 1, 1, '2025-01-15T00:00:00.000Z', '2025-01-15T00:00:00.000Z'),
(5, 'Content Management Integration', 'Integrate CMS for easy content updates', 'todo', 'medium', '2025-02-11T00:00:00.000Z', NULL, NULL, ARRAY['cms', 'integration'], 1, 1, 1, '2025-01-16T00:00:00.000Z', '2025-01-16T00:00:00.000Z'),
(6, 'Mobile App Architecture Design', 'Design app architecture and technology stack', 'completed', 'high', '2025-01-11T00:00:00.000Z', '2025-01-07T00:00:00.000Z', '2025-01-10T00:00:00.000Z', ARRAY['architecture', 'planning'], 2, 3, 3, '2025-01-07T00:00:00.000Z', '2025-01-09T00:00:00.000Z'),
(7, 'User Authentication System', 'Implement login, registration, and password reset', 'in-progress', 'low', '2025-01-22T00:00:00.000Z', '2025-01-13T00:00:00.000Z', NULL, ARRAY['authentication', 'security', 'mobile'], 2, 1, 1, '2025-01-12T00:00:00.000Z', '2025-01-16T00:00:00.000Z'),
(8, 'Core Features Implementation', 'Build main app features and user flows', 'todo', 'high', '2025-01-29T00:00:00.000Z', NULL, NULL, ARRAY['features', 'development'], 2, 1, 1, '2025-01-14T00:00:00.000Z', '2025-01-14T00:00:00.000Z'),
(9, 'Push Notifications Setup', 'Configure push notifications for user engagement', 'todo', 'medium', '2025-02-04T00:00:00.000Z', NULL, NULL, ARRAY['notifications', 'engagement'], 2, 1, 1, '2025-01-15T00:00:00.000Z', '2025-01-15T00:00:00.000Z'),
(10, 'Payment Gateway Research', 'Evaluate and select payment processing solutions', 'completed', 'high', '2025-01-13T00:00:00.000Z', '2025-01-09T00:00:00.000Z', '2025-01-12T00:00:00.000Z', ARRAY['research', 'payments'], 3, 2, 2, '2025-01-09T00:00:00.000Z', '2025-01-11T00:00:00.000Z'),
(11, 'Stripe API Integration', 'Integrate Stripe for payment processing', 'in-progress', 'low', '2025-01-20T00:00:00.000Z', '2025-01-14T00:00:00.000Z', NULL, ARRAY['stripe', 'api', 'payments'], 3, 2, 2, '2025-01-13T00:00:00.000Z', '2025-01-16T00:00:00.000Z'),
(12, 'Shipping API Integration', 'Integrate UPS and FedEx shipping APIs', 'todo', 'low', '2025-01-25T00:00:00.000Z', NULL, NULL, ARRAY['shipping', 'api', 'logistics'], 3, 2, 2, '2025-01-15T00:00:00.000Z', '2025-01-15T00:00:00.000Z'),
(13, 'Payment Testing & Validation', 'Test payment flows and ensure PCI compliance', 'todo', 'medium', '2025-01-27T00:00:00.000Z', NULL, NULL, ARRAY['testing', 'security', 'validation'], 3, 2, 2, '2025-01-16T00:00:00.000Z', '2025-01-16T00:00:00.000Z'),
(14, 'Error Handling & Monitoring', 'Implement error handling and monitoring for API calls', 'todo', 'medium', '2025-02-01T00:00:00.000Z', NULL, NULL, ARRAY['monitoring', 'error-handling'], 3, 2, 2, '2025-01-17T00:00:00.000Z', '2025-01-17T00:00:00.000Z'),
(15, 'Responsive Design Implementation', 'Ensure all pages work perfectly on mobile, tablet, and desktop', 'completed', 'high', '2025-01-10T00:00:00.000Z', '2025-01-06T00:00:00.000Z', '2025-01-09T00:00:00.000Z', ARRAY['responsive', 'css', 'testing'], 1, 1, 1, '2025-01-05T00:00:00.000Z', '2025-01-09T00:00:00.000Z'),
(16, 'SEO Implementation', 'Implement meta tags, structured data, and SEO optimization', 'in-progress', 'high', '2025-01-20T00:00:00.000Z', '2025-01-12T00:00:00.000Z', NULL, ARRAY['seo', 'meta-tags', 'optimization'], 1, 1, 1, '2025-01-11T00:00:00.000Z', '2025-01-15T00:00:00.000Z'),
(17, 'Performance Optimization', 'Optimize images, minify assets, and implement lazy loading', 'todo', 'medium', '2025-01-30T00:00:00.000Z', NULL, NULL, ARRAY['performance', 'optimization', 'images'], 1, 1, 1, '2025-01-13T00:00:00.000Z', '2025-01-13T00:00:00.000Z'),
(18, 'Accessibility Testing', 'Ensure WCAG 2.1 AA compliance and screen reader compatibility', 'todo', 'high', '2025-01-27T00:00:00.000Z', NULL, NULL, ARRAY['accessibility', 'wcag', 'testing'], 1, 4, 4, '2025-01-14T00:00:00.000Z', '2025-01-14T00:00:00.000Z'),
(19, 'Cross-browser Testing', 'Test and fix issues on Chrome, Firefox, Safari, and Edge', 'todo', 'medium', '2025-02-14T00:00:00.000Z', NULL, NULL, ARRAY['testing', 'browsers', 'compatibility'], 1, 1, 1, '2025-01-15T00:00:00.000Z', '2025-01-15T00:00:00.000Z'),
(20, 'Analytics Integration', 'Integrate Google Analytics and custom event tracking', 'todo', 'medium', '2025-02-12T00:00:00.000Z', NULL, NULL, ARRAY['analytics', 'tracking', 'metrics'], 1, 1, 1, '2025-01-16T00:00:00.000Z', '2025-01-16T00:00:00.000Z'),
(21, 'Security Audit & Hardening', 'Conduct security audit and implement security headers', 'todo', 'high', '2025-02-16T00:00:00.000Z', NULL, NULL, ARRAY['security', 'audit', 'headers'], 1, 1, 1, '2025-01-16T00:00:00.000Z', '2025-01-16T00:00:00.000Z'),
(22, 'Deployment Pipeline Setup', 'Configure CI/CD pipeline with automated testing and deployment', 'todo', 'medium', '2025-02-21T00:00:00.000Z', NULL, NULL, ARRAY['deployment', 'ci/cd', 'automation'], 1, 1, 1, '2025-01-17T00:00:00.000Z', '2025-01-17T00:00:00.000Z'),
(23, 'Standalone Task for Testing', 'This is a standalone task created for testing purposes', 'todo', 'medium', '2025-02-21T00:00:00.000Z', NULL, NULL, ARRAY['test'], NULL, 1, 1, '2025-01-17T00:00:00.000Z', '2025-01-17T00:00:00.000Z');

-- Mock data for task_assignments table
INSERT INTO task_assignments (task_id, user_id) VALUES
(1, 1), -- Initial Planning assigned to Alex
(1, 2), -- Initial Planning assigned to Sarah
(2, 2), -- UI/UX Design assigned to Sarah
(2, 4), -- UI/UX Design assigned to Emma
(3, 1), -- Frontend Homepage assigned to Alex
(3, 2), -- Frontend Homepage assigned to Sarah
(4, 1), -- Internal Pages assigned to Alex
(4, 2), -- Internal Pages assigned to Sarah
(5, 4), -- CMS Integration assigned to Emma
(6, 3), -- Mobile Architecture assigned to Mike
(7, 3), -- User Auth assigned to Mike
(8, 2), -- Core Features assigned to Sarah
(8, 3), -- Core Features assigned to Mike
(9, 2), -- Push Notifications assigned to Sarah
(10, 2), -- Payment Gateway assigned to Sarah
(10, 3), -- Payment Gateway assigned to Mike
(11, 3), -- Stripe Integration assigned to Mike
(12, 2), -- Shipping API assigned to Sarah
(13, 3), -- Payment Testing assigned to Mike
(14, 2), -- Error Handling assigned to Sarah
(15, 1), -- Responsive Design assigned to Alex
(15, 2), -- Responsive Design assigned to Sarah
(16, 1), -- SEO assigned to Alex
(17, 2), -- Performance Optimization assigned to Sarah
(18, 1), -- Accessibility Testing assigned to Alex
(18, 4), -- Accessibility Testing assigned to Emma
(19, 2), -- Cross-browser Testing assigned to Sarah
(19, 3), -- Cross-browser Testing assigned to Mike
(20, 1), -- Analytics Integration assigned to Alex
(21, 1), -- Security Audit assigned to Alex
(21, 3), -- Security Audit assigned to Mike
(22, 2), -- Deployment Pipeline assigned to Sarah
(22, 3), -- Deployment Pipeline assigned to Mike
(23, 1); -- Standalone Task assigned to Alex
