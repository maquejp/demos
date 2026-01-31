# Tasks Manager Database

Start PostgreSQL with Docker Compose:

```bash
docker-compose up -d
```

**Database connection:**

- Host: localhost
- Port: 15432
- User: postgres
- Password: postgres
- Database: tasks_manager

**Stop database:**

```bash
docker-compose down
```

**View logs:**

```bash
docker-compose logs -f postgres
```
