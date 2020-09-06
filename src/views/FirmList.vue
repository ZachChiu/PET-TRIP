<template>
  <div class="firmList">
    <div class="banner position-relative">
      <div class="bannerText position-absolute text-dark display-4 font-weight-bold">尋找寄宿</div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px;object-fit: cover; width: 100%;"
        alt
      />
    </div>
    <div class="bg-light">
      <div class="container py-3">
        <form class>
          <div class="form-row">
            <div class="form-group col-md-6 col-12 align-items-center">
              <div class="row align-items-center">
                <label class="col-lg-3 col-form-label" for="petType">寵物類型</label>
                <div class="col-lg-9">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="cat" value="cat" />
                    <label class="form-check-label" for="cat">貓</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="bog" value="dog" />
                    <label class="form-check-label" for="bog">狗</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="other" value="other" />
                    <label class="form-check-label" for="other">其他</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 col-12 align-items-center">
              <div class="row align-items-center">
                <label class="col-lg-3 col-form-label" for="petType">條件篩選</label>
                <div class="col-lg-9">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="price" value="金額(低-高)" />
                    <label class="form-check-label" for="price">金額(低-高)</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="evaluation" value="評價(高-低)" />
                    <label class="form-check-label" for="evaluation">評價(高-低)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6 col-12">
              <div class="row">
                <label class="col-lg-3 col-form-label" for="pteNum">寵物數量</label>
                <div class="col-lg-9">
                  <select id="pteNum" class="form-control">
                    <option selected disabled>請選擇</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">5以上</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 col-12">
              <div class="row">
                <label class="col-lg-3 col-form-label" for="pteNum">接受尺寸</label>
                <div class="col-lg-9">
                  <select id="pteNum" class="form-control">
                    <option selected disabled>請選擇</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">5以上</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6 col-12">
              <div class="row">
                <label class="col-lg-3 col-form-label" for="inputCity">縣市</label>
                <div class="col-lg-9">
                  <select id="inputCity" class="form-control">
                    <option selected disabled>請選擇</option>
                    <option>高雄市</option>
                    <option>台北市</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group col-md-6 col-12">
              <div class="row">
                <label class="col-lg-3 col-form-label" for="inputState">區域</label>
                <div class="col-lg-9">
                  <select id="inputState" class="form-control">
                    <option selected disabled>請選擇</option>
                    <option>三民區</option>
                    <option>前鎮區</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6 col-12">
              <div class="form-group row">
                <label class="col-lg-3 col-form-label" for="petSize">期間</label>
                <div class="col-lg-9">
                  <div class="input-group">
                    <input type="date" class="form-control" />
                    <input type="date" class="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="container py-5">
      <div class="row justify-content-between">
        <div class="col-lg-4 col-md-5 mb-3">
          <div class="card w-100">
            <img
              src="https://i0.wp.com/blog.gowifi.com.tw/wp-content/uploads/2019/12/01jing_bei_shi_dong_bao_chu_fu_dao_hou_ling_you_te_ding_chong_wu_ye_xu_ke_zheng_zhi_mao_ji_su_ye_zhe_zi_liao_lai_yuan_jiu_shi_mao_gong_zuo_shi_.jpg?w=640&ssl=1"
              class="card-img-top"
              alt
            />
            <div class="card-body">
              <div class="row align-items-start">
                <div class="col-5">
                  <img
                    class="rounded-circle img-fluid"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8Gm9_I4BxJRo6DCkyT3GVioVWztUNPy2gyg&usqp=CAU"
                    alt
                  />
                </div>
                <div class="col-7">
                  <p class="text-warning">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span>4.8</span>
                  </p>
                  <h5 class="card-title">子庭寵物寄宿</h5>
                  <p class="mb-1 card-text">高雄市,三民區</p>
                  <p class="mb-1 card-text">貓咪</p>
                  <p class="mb-1 card-text text-secondary">共有10間房間</p>
                  <p class="mb-1 card-text text-danger">$ 1000 / 天</p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="stretched-link w-100 btn btn-primary">查看詳情</a>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-5 mb-3">
          <div class="card w-100">
            <img
              src="https://i0.wp.com/blog.gowifi.com.tw/wp-content/uploads/2019/12/01jing_bei_shi_dong_bao_chu_fu_dao_hou_ling_you_te_ding_chong_wu_ye_xu_ke_zheng_zhi_mao_ji_su_ye_zhe_zi_liao_lai_yuan_jiu_shi_mao_gong_zuo_shi_.jpg?w=640&ssl=1"
              class="card-img-top"
              alt
            />
            <div class="card-body">
              <div class="row align-items-start">
                <div class="col-5 overflow-hidden">
                  <img
                    class="rounded-circle img-fluid"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8Gm9_I4BxJRo6DCkyT3GVioVWztUNPy2gyg&usqp=CAU"
                    alt
                  />
                </div>
                <div class="col-7">
                  <p class="text-warning">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span>4.8</span>
                  </p>
                  <h5 class="card-title">子庭寵物寄宿</h5>
                  <p class="mb-1 card-text">高雄市,三民區</p>
                  <p class="mb-1 card-text">貓咪</p>
                  <p class="mb-1 card-text text-danger">僅剩10間房間!</p>
                  <p class="mb-1 card-text text-danger">$ 600 ~ 1000 / 天</p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="stretched-link w-100 btn btn-primary">查看詳情</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-5 mb-3">
          <div class="card w-100">
            <img
              src="https://i0.wp.com/blog.gowifi.com.tw/wp-content/uploads/2019/12/01jing_bei_shi_dong_bao_chu_fu_dao_hou_ling_you_te_ding_chong_wu_ye_xu_ke_zheng_zhi_mao_ji_su_ye_zhe_zi_liao_lai_yuan_jiu_shi_mao_gong_zuo_shi_.jpg?w=640&ssl=1"
              class="card-img-top"
              alt
            />
            <div class="card-body">
              <div class="row align-items-start">
                <div class="col-5 overflow-hidden">
                  <img
                    class="rounded-circle img-fluid"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8Gm9_I4BxJRo6DCkyT3GVioVWztUNPy2gyg&usqp=CAU"
                    alt
                  />
                </div>
                <div class="col-7">
                  <p class="text-warning">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span>4.8</span>
                  </p>
                  <h5 class="card-title">子庭寵物寄宿</h5>
                  <p class="mb-1 card-text">高雄市,三民區</p>
                  <p class="mb-1 card-text">貓咪</p>
                  <p class="mb-1 card-text text-danger">僅剩10間房間!</p>
                  <p class="mb-1 card-text text-danger">$ 600 ~ 1000 / 天</p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="stretched-link w-100 btn btn-primary">查看詳情</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-5 mb-3">
          <div class="card w-100">
            <img
              src="https://i0.wp.com/blog.gowifi.com.tw/wp-content/uploads/2019/12/01jing_bei_shi_dong_bao_chu_fu_dao_hou_ling_you_te_ding_chong_wu_ye_xu_ke_zheng_zhi_mao_ji_su_ye_zhe_zi_liao_lai_yuan_jiu_shi_mao_gong_zuo_shi_.jpg?w=640&ssl=1"
              class="card-img-top"
              alt
            />
            <div class="card-body">
              <div class="row align-items-start">
                <div class="col-5 overflow-hidden">
                  <img
                    class="rounded-circle img-fluid"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8Gm9_I4BxJRo6DCkyT3GVioVWztUNPy2gyg&usqp=CAU"
                    alt
                  />
                </div>
                <div class="col-7">
                  <p class="text-warning">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span>4.8</span>
                  </p>
                  <h5 class="card-title text-truncate">子庭寵物寄宿子庭寵物寄宿</h5>
                  <p class="mb-1 card-text">高雄市,三民區</p>
                  <p class="mb-1 card-text">貓咪</p>
                  <p class="mb-1 card-text text-danger">僅剩10間房間!</p>
                  <p class="mb-1 card-text text-danger">$ 600 ~ 1000 / 天</p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="#" class="stretched-link w-100 btn btn-primary">查看詳情</a>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
