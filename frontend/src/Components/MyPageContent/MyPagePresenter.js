import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const UserProfile = ({ handleLogout }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            alt="user-image"
            src="https://avatars.githubusercontent.com/u/43488305?v=4"
          />
        }
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          poiu694@naver.com
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          얼마를 아꼈는가? <b>32,405원</b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" color="primary" href="/main">
          장바구니 바로가기
        </Button>
        <Button size="large" color="secondary" onClick={handleLogout}>
          LOGOUT
        </Button>
      </CardActions>
    </Card>
  );
};

const WithDrawButton = ({ handleWithDraw }) => {
  return (
    <Button
      variant="contained"
      onClick={handleWithDraw}
      className="withdraw-btn"
    >
      회원 탈퇴 하기
    </Button>
  );
};

const MyPagePresenter = ({ handleLogout, handleWithDraw }) => {
  return (
    <div className="my-info-container">
      <UserProfile handleLogout={handleLogout} />
      <WithDrawButton handleWithDraw={handleWithDraw} />
    </div>
  );
};

export default MyPagePresenter;
