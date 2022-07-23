import * as React from "react";
import './App.css';
import { Button } from "react-bootstrap";
import loader from './1488.gif';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function App() {
  const [users, setUsers] = React.useState([]);
  const [singleUser, setSingleUser] = React.useState();
  const [showLoader, setShowLoader] = React.useState(null);
  const f = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
  };
  React.useEffect(() => {
    f();
  }, []);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const getUserDetails = async (id) => {
    setSingleUser(null);
    setShowLoader(true);
    await delay(500);
    const res = await fetch("https://reqres.in/api/users/" + id);
    const json = await res.json();
    setSingleUser(json.data);
    setShowLoader(false);
  }
  return (
    <div className="App">
      <h1>Front End Task for Convin</h1>
      <h3>Displaying User Details after Fetching data from API.</h3>
      {!singleUser && !showLoader &&
        <Card border="danger" style={{ width: '18rem', margin: 'auto' }}>
          <Card.Body>
            <Card.Text> Choose an Id to display User Details ! </Card.Text>
          </Card.Body>
        </Card>
      }
      <br />
      {showLoader && <img src={loader} />}
      {singleUser && <div className="flex">
        <Card>
          <Card.Body>
            <Card.Title>User Profile Card</Card.Title>
            <Card.Text>
              <img key={singleUser.avatar} src={singleUser.avatar} />
              <div key={singleUser.id}>
                <p>
                  <strong> Name : {singleUser.first_name} {singleUser.last_name}</strong>
                </p>
                <p><strong> Email Id: </strong> {singleUser.email}</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>}
      {users.length == 0 && <img src={loader} />}
      <div className="flex">
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <Button onClick={() => getUserDetails(user.id)}>{user.id}</Button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
