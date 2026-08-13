export interface UserData
{
    fullname:string;
    email:string;
    password:string;
}
export interface TableData
{
    _id:string;
    category:string;
    userId:string;
    amount:number;
    date:Date;
    entryType:string;

}
export interface FormData {
  name: string;
  email: string;
  message: string;
}
export interface TrackFolioLandingProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}
