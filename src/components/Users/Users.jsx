import React from "react";
import classes from "./Users.module.css";
import * as axios from "axios";
import userPhoto from "../../assets/images/user.png";

class Users extends React.Component {
  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then(response => {
        this.props.setUsers(response.data.items);
      });
  }

  render() {
    return (
      <div>
        {this.props.users.map(u => (
          <div key={u.id}>
            <span>
              <div>
                <img
                  src={u.photos.small !== null ? u.photos.small : userPhoto}
                  className={classes.usersPhoto}
                />
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                {/*<div>{u.status}</div>*/}
              </span>
              <span>
                {/*<div>{"u.location.city"}</div>*/}
                {/*<div>{"u.location.country"}</div>*/}
              </span>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id);
                    }}
                  >
                    Отписаться
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
                    }}
                  >
                    Подписаться
                  </button>
                )}
              </div>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
