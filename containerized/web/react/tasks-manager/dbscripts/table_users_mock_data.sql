-- Mock data for users table

INSERT INTO users (id, name, email, avatar, role, created_at, modified_at) VALUES
(1, 'Alex Johnson', 'alex@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', 'admin', '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
(2, 'Sarah Chen', 'sarah@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', 'user', '2024-01-02T00:00:00.000Z', '2024-01-02T00:00:00.000Z'),
(3, 'Alice Johnson', 'alice.johnson@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', 'admin', NOW() - INTERVAL '90 days', NOW() - INTERVAL '10 days'),
(4, 'Bob Smith', 'bob.smith@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob', 'user', NOW() - INTERVAL '60 days', NOW() - INTERVAL '5 days'),
(5, 'Carol Davis', 'carol.davis@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol', 'user', NOW() - INTERVAL '45 days', NOW() - INTERVAL '2 days'),
(6, 'David Wilson', 'david.wilson@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=david', 'admin', NOW() - INTERVAL '120 days', NOW() - INTERVAL '1 day'),
(7, 'Emma Martinez', 'emma.martinez@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', 'user', NOW() - INTERVAL '30 days', NOW()),
(8, 'Frank Brown', 'frank.brown@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank', 'user', NOW() - INTERVAL '15 days', NOW() - INTERVAL '3 hours'),
(9, 'Grace Taylor', 'grace.taylor@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=grace', 'user', NOW() - INTERVAL '7 days', NOW() - INTERVAL '6 hours'),
(10, 'Henry Garcia', 'henry.garcia@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=henry', 'user', NOW() - INTERVAL '5 days', NOW() - INTERVAL '12 hours');
