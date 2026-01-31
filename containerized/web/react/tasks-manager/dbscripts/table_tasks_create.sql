DROP TABLE tasks;
DROP TYPE task_statuses;
DROP TYPE task_priorities;

CREATE TYPE task_statuses AS ENUM ('todo', 'in-progress', 'completed', 'cancelled');
CREATE TYPE task_priorities AS ENUM ('low', 'medium', 'high');

CREATE TABLE tasks (
    id SERIAL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_statuses NOT NULL DEFAULT 'todo',
    priority task_priorities NOT NULL DEFAULT 'low',
    due_date TIMESTAMP WITH TIME ZONE,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    tags TEXT[], 
    project_id INTEGER,
    created_by INTEGER NOT NULL,
    updated_by INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE tasks 
ADD CONSTRAINT pk_tasks_id PRIMARY KEY (id);

ALTER TABLE tasks 
ADD CONSTRAINT fk_tasks_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT;

ALTER TABLE tasks 
ADD CONSTRAINT fk_tasks_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT;

CREATE TABLE task_assignments (
    task_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL
);

ALTER TABLE task_assignments 
ADD CONSTRAINT pk_task_assignments PRIMARY KEY (task_id, user_id);

ALTER TABLE task_assignments 
ADD CONSTRAINT fk_assignment_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE RESTRICT;

ALTER TABLE task_assignments 
ADD CONSTRAINT fk_assignment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT;