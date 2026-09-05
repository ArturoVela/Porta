CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  publication_id TEXT NOT NULL,
  author_name TEXT NOT NULL CHECK(length(author_name) BETWEEN 1 AND 80),
  body TEXT NOT NULL CHECK(length(body) BETWEEN 1 AND 2000),
  created_at TEXT NOT NULL,
  hidden_at TEXT,
  legacy_id TEXT UNIQUE
);

CREATE INDEX IF NOT EXISTS comments_publication_visible_created_idx
  ON comments(publication_id, hidden_at, created_at DESC);
