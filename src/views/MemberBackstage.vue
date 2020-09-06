<template>
  <div class="memberBackstage">
    <div class="banner position-relative">
      <div class="bannerText position-absolute text-dark display-4 font-weight-bold">會員後台</div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px;object-fit: cover; width: 100%;"
        alt
      />
    </div>
    <div class="container py-4">
      <div class="row">
        <div class="col-md-3 col-12 mb-3">
          <nav class="bg-light">
            <ul class="nav nav-pills nav-fill flex-md-column text-center">
              <li class="nav-item">
                <router-link to="/MemberBackstage" class="nav-link active">
                  <i class="fas fa-clipboard-list"></i>
                  訂單列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/MemberBackstage" class="nav-link">
                  <i class="fas fa-question"></i>
                  問與答QA
                </router-link>
              </li>
              <li class="nav-item">
                 <router-link to="/MemberBackstage/MemberSet" class="nav-link">
                   <i class="fas fa-cog"></i>
                  會員設定
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9 col-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
