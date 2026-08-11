class UserRepository { constructor(private db:any){} find(id:string){ return this.db.user.findUnique({where:{id}}); } }
class UserService { constructor(private repo:UserRepository){} find(id:string){ return this.repo.find(id); } }
class UserFacade { constructor(private svc:UserService){} find(id:string){ return this.svc.find(id); } }
