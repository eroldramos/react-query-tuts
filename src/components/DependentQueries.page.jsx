import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get("http://localhost:4000/users/" + email);
};

const fetchCoursesByChannelId = (channelId) => {
  console.log(!!channelId);
  return axios.get("http://localhost:4000/channels/" + channelId);
};

const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  return (
    <>
      <h1>Courses</h1>
      {courses?.data?.courses?.map((course, index) => (
        <div key={index}>
          <ul>
            <li>{course}</li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default DependentQueriesPage;
