<template>
  <div class="login">
    <div class="banner position-relative">
      <div class="bannerText position-absolute text-dark display-4 font-weight-bold">登入</div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px;object-fit: cover; width: 100%;"
        alt
      />
    </div>
    <div class="container py-5">
      <div class="row no-gutters">
        <div class="col-lg-6 col-12 mx-auto border rounded">
          <ul class="nav nav-pills text-center" id="myTab" role="tablist">
            <li class="nav-item w-50">
              <a
                class="nav-link active"
                id="member-tab"
                data-toggle="tab"
                href="#member"
                role="tab"
                aria-controls="member"
                aria-selected="true"
              >會員登入</a>
            </li>
            <li class="nav-item w-50">
              <a
                class="nav-link"
                id="firm-tab"
                data-toggle="tab"
                href="#firm"
                role="tab"
                aria-controls="firm"
                aria-selected="false"
              >廠商登入</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="member"
              role="tabpanel"
              aria-labelledby="member-tab"
            >
              <form class="py-5 px-2 px-sm-5">
                <h3 class="text-center mb-3">會員登入</h3>
                <div class="form-group">
                  <label for="memberEmail">帳號</label>
                  <input
                    type="email"
                    class="form-control"
                    id="memberEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="memberPassword">密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    id="memberPassword"
                    placeholder="Password"
                  />
                  <a href="#">忘記密碼?</a>
                </div>

                <div class="form-group d-flex">
                  <router-link to="/MemberRegister" class="w-50 mr-2 btn btn btn-outline-primary">會員註冊</router-link>
                  <button type="submit" class="w-50 ml-2 btn btn-primary">會員登入</button>
                </div>
              </form>
            </div>
            <div class="tab-pane fade" id="firm" role="tabpanel" aria-labelledby="firm-tab">
              <form class="py-5 px-2 px-sm-5">
                <h3 class="text-center mb-3">廠商登入</h3>
                <div class="form-group">
                  <label for="firmEmail">帳號</label>
                  <input
                    type="email"
                    class="form-control"
                    id="firmEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="firmPassword">密碼</label>
                  <input
                    type="password"
                    class="form-control"
                    id="firmPassword"
                    placeholder="Password"
                  />
                  <a href="#">忘記密碼?</a>
                </div>
                <div class="form-group d-flex">
                  <router-link to="/FirmRegister" class="w-50 mr-2 btn btn btn-outline-primary">廠商註冊</router-link>
                  <button type="button" class="w-50 ml-2 btn btn-primary">廠商登入</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
