import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({
  currentPage,
  totalUsersCount,
  onPageChanged,
  pageSize,
  users,
  followingInProgress,
  follow,
  unfollow
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        onPageChanged={onPageChanged}
        pageSize={pageSize}
      />
      <div>
        {users.map(u => (
          <User
            key={u.id}
            id={u.id}
            followingInProgress={followingInProgress}
            user={u}
            follow={follow}
            unfollow={unfollow}
          />
        ))}
      </div>
    </div>
  );
};
export default Users;
