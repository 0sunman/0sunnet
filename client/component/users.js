import https from "https";
import Link from "next/link";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
function Users({ data }) {
    console.log(data)
 return (
  <>
   <h1>Users page</h1>
   <ul>
    {data.map((datas) => (
     <li key={datas.id}>
      <Link href={`${datas.id}`}>
       <a>
        {datas.name} : {datas.email}
       </a>
      </Link>
     </li>
    ))}
   </ul>
  </>
 );}

 export default Users;
   