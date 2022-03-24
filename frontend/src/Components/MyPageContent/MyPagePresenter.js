import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import addComma from "../../Util/AddComma";

const UserProfile = ({ handleLogout, userInfo, profit }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt="user-image" src={userInfo.user_image} />}
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {userInfo.user_email}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          얼마를 아꼈는가? <b>{addComma(profit)}원</b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" color="primary" href="/mybag">
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

const MyPagePresenter = ({
  handleLogout,
  handleWithDraw,
  userInfo,
  profit,
}) => {
  return (
    <main className="my-info-container">
      <UserProfile
        handleLogout={handleLogout}
        userInfo={userInfo}
        profit={profit}
      />
      <WithDrawButton handleWithDraw={handleWithDraw} />
    </main>
  );
};

export default MyPagePresenter;
