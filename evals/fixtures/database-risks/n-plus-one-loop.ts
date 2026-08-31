// Synthetic fixture: N+1 queries in loop without eager loading
interface User {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  userId: string;
}

interface Database {
  findUsers: () => Promise<User[]>;
  findPostsByUserId: (userId: string) => Promise<Post[]>;
}

export async function getUserFeed(db: Database): Promise<Array<User & { posts: Post[] }>> {
  const users = await db.findUsers();
  const results = [];
  
  for (const user of users) {
    // N+1 Query: Single query executed per user in loop
    const posts = await db.findPostsByUserId(user.id);
    results.push({ ...user, posts });
  }
  
  return results;
}
