export interface UserData
{
    fullname:string;
    email:string;
    password:string;
}
export interface TableData
{
    _id:string;
    category?:string;
    amount?:number;
    date:Date;
    entryType?:string;

}
export interface newsData
{
    source:{
        id:string;
        name:string;
    },
    author:string;
    title:string;
    description:string;
    url:string;
    urlToImage:string;
    publishedAt:string;
    content:string;
}