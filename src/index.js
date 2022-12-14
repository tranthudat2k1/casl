import { Ability, AbilityBuilder, ForbiddenError } from "@casl/ability";


class Posts {
    constructor(authorId)
    {
        this.authorId = authorId;
        this.content = "ABC",
        this.view = 0
    }
}

const SomePost = new Posts(6)

const user = {
     isAdmin : false,
     name : 'Tran Dat',
     id : 19
}


// dinh nghia cac kha nang
const defineAbility = (user) =>{
    const {can,cannot,build} = new AbilityBuilder(Ability);
    // dinh nghia kha nang co the lam duoc do la read va posts 
    // read trong crud , Post la model cua minh
    if(user.isAdmin){
    can('manage','all') // duoc lam moi thu, all la quan ly duoc moi thu
    }
    else {
        can('read','Posts',["authorId","view"]);
        can('create','Posts');
        can('update','Posts',['content'],{// array nhung truong cho phep update
            authorId : user.id,
            authorId : 6
            // neu nhu khong trung id voi author se tra ve false.
        }); // only if they own it. 
        cannot('delete','Posts').because('Only Admin can delete Posts !!!') // dung Fobident se tra duoc ve loi trong because
    }
    // dinh nghia la khong duowc xoa
    // cannot('delete','Posts');
    // dung build de build ra cai ham nay
    return build();
}

// dinh nghia su dung
const ability = defineAbility(user);
// check xem co dung khong 
// const isAllowed = ability.can('update',SomePost,'content');
const isAllowed = ability.can('read',SomePost, "content");
// const isAllowed1 = ability.can('read',SomePost, "authorId");
console.log("allow : ",isAllowed)
// try {
//     ForbiddenError.from(ability).throwUnlessCan('delete','Posts') // tra ve loi o because
// } catch (error) {
//     console.log(error.message)
// }