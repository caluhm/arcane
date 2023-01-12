import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { stringify } from 'querystring';


export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: {name: string, picture: string, sub:string } = jwt_decode(response.credential);

  const { name, picture, sub } = decoded;
  
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  
  console.log(decoded)

  addUser(user);

  await axios.post(`http://localhost:3000/api/auth`, user);
};