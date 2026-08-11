export async function usersWithPosts(db:any) {
  const users = await db.user.findMany();
  for (const u of users) u.posts = await db.post.findMany({ where:{userId:u.id} });
  return users;
}
