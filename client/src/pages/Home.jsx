import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import {Link} from "react-router-dom";

export function Home() {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user._id}>

              <p>{user.username}</p>
              <Link to={`/profile/${user._id}`}>
                <p>{user.firstName}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}