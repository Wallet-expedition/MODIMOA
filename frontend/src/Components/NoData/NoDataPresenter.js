const NoDataPresenter = () => {
  return (
    <div className="no-data-image-container">
      <img src="/img/no_data.png" alt="no_data" />
      <div className="no-data-desc">데이터가 존재하지 않습니다.</div>
    </div>
  );
};

export default NoDataPresenter;
