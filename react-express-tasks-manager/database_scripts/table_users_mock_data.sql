-- Mock data for users table

INSERT INTO users (name, email, avatar, role, created_at, modified_at) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', 'admin', NOW() - INTERVAL '90 days', NOW() - INTERVAL '10 days'),
('Bob Smith', 'bob.smith@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob', 'user', NOW() - INTERVAL '60 days', NOW() - INTERVAL '5 days'),
('Carol Davis', 'carol.davis@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol', 'user', NOW() - INTERVAL '45 days', NOW() - INTERVAL '2 days'),
('David Wilson', 'david.wilson@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=david', 'admin', NOW() - INTERVAL '120 days', NOW() - INTERVAL '1 day'),
('Emma Martinez', 'emma.martinez@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', 'user', NOW() - INTERVAL '30 days', NOW()),
('Frank Brown', 'frank.brown@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank', 'user', NOW() - INTERVAL '15 days', NOW() - INTERVAL '3 hours'),
('Grace Taylor', 'grace.taylor@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace', 'user', NOW() - INTERVAL '7 days', NOW() - INTERVAL '6 hours'),
('Henry Garcia', 'henry.garcia@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=henry', 'user', NOW() - INTERVAL '5 days', NOW() - INTERVAL '12 hours');
