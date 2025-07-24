

export interface PostType {
    id:number;
    name:string;
    title : string;
    company : string;
    avatar : string;
    content : string;
    time:string;
    likes : string;

}


export const Postdata = [
  {
    id:1,
    name: "Andrew Michel",
    title: "Sr. Android Developer",
    company: "Microsoft",
    avatar:  require("../../assets/images/man.png"),
    content: "are you lokking for a tealeted indvidual to koin your team",
    time: "20 mins ago",
    likes: "2.3k",
    role:"Desktop App Developer"
  },
  {
    id:2,
    name: "Rachel Tales",
    title: "Data Analyst & Senior Developer",
    company: "Quara",
    avatar: require("../../assets/images/grils.png"),
    content: "are you lokking for a tealeted indvidual to koin your team",
    time: "1 hr ago",
    likes: "1.7k",
    role:"Desktop App Developer"
  },
];
