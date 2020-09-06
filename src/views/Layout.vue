<template>
  <div class="layout">
    <nav class="headerNav navbar navbar-expand-md navbar-light bg-light position-sticky">
      <div class="container">
        <h1 class="h6 mb-0">
          <a class="navbar-brand" href="#">
            <img width="80" src="https://upload.cc/i1/2020/09/02/X38KBL.png" alt /> Pet Trip
          </a>
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="hoverLine navbar-nav ml-auto">
            <li class="nav-item hoveritem active">
              <router-link to="/" class="nav-link">
                <i class="fas fa-paw mr-1"></i>首頁
              </router-link>
            </li>
            <li class="nav-item hoveritem">
               <router-link to="/FirmList" class="nav-link">
                <i class="fas fa-paw mr-1"></i>尋找寄宿
              </router-link>
            </li>
            <li class="nav-item hoveritem">
                <router-link to="/Login" class="nav-link">
                <i class="fas fa-paw mr-1"></i>註冊 / 登入
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <footer class="bg-dark">
      <div class="container">
        <div class="row no-gutters align-items-sm-center">
          <div class="col-6 col-sm-9">
            <ul class="list-unstyled d-flex flex-sm-row flex-column my-0 text-white flex-wrap">
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 fas fa-fingerprint"></i>關於我們
                </a>
                <span class="mx-2 d-sm-inline d-none">|</span>
              </li>
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 far fa-question-circle"></i>常見問題
                </a>
                <span class="mx-2 d-sm-inline d-none">|</span>
              </li>
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 far fa-envelope-open"></i>問題回報
                </a>
                <span class="mx-2 d-sm-inline d-none">|</span>
              </li>
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 fas fa-bullhorn"></i>免責聲明
                </a>
                <span class="mx-2 d-sm-inline d-none">|</span>
              </li>
              <li class="my-2">
                <a href="#" class="text-white">
                  <i class="mr-1 fas fa-list-ol"></i>服務條款
                </a>
              </li>
            </ul>
          </div>
          <div class="col-6 col-sm-3 d-flex flex-column align-items-center justify-content-end">
            <ul class="mb-0 list-unstyled text-white d-flex justify-content-between h2">
              <li class="my-2">
                <a href="mailto:hexschool@home.com" class="text-white">
                  <i class="fas fa-at"></i>
                </a>
              </li>
              <li class="my-2">
                <a href="https://www.facebook.com/" target="_blank" class="ml-3 text-white">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li class="my-2">
                <a href="https://www.instagram.com/" target="_blank" class="ml-3 text-white">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
            <p class="text-muted mb-1">©2020 Pet Trip</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
