<template>
  <div class="about">
    <div class="banner position-relative">
      <div
        class="bannerText position-absolute text-dark display-4 font-weight-bold"
      >
        關於我們
      </div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px; object-fit: cover; width: 100%"
        alt
      />
    </div>
    <div class="container py-4">
      <div class="row justify-content-around">
        <div class="col-8 col-md-3 col-sm-4">
          <div class="hoverPic position-relative rounded-circle">
            <img
              class="img-fluid border rounded-circle bg-white position-relative"
              src="../assets/img/frontend.png"
              alt="前端工程師-邱廷鈺"
            />
            <ul
              class="hoverInfo mb-0 pt-2 pb-4 list-unstyled text-light position-absolute text-center"
            >
              <li>
                <a class="h5" href="mailto:awdx8326@gmail.com"
                  ><i class="mr-1 fas fa-envelope"></i>Email</a
                >
              </li>
              <li>
                <a
                  class="h5"
                  target="_blank"
                  href="https://github.com/ZachChiu?tab=repositories"
                  ><i class="mr-1 fab fa-github"></i>github</a
                >
              </li>
            </ul>
          </div>
          <p class="text-center mt-2">
            前端工程師 <br />
            <b class="h5">邱廷鈺</b>
          </p>
        </div>
        <div class="col-8 col-md-3 col-sm-4">
          <div class="hoverPic position-relative rounded-circle">
            <img
              class="img-fluid border rounded-circle bg-white position-relative"
              src="../assets/img/backend.png"
              alt="後端工程師-黃子庭"
            />
            <ul
              class="hoverInfo mb-0 pt-2 pb-4 list-unstyled text-light position-absolute text-center"
            >
              <li>
                <a class="h5" href="mailto:ga1033065566@gmail.com"
                  ><i class="mr-1 fas fa-envelope"></i>Email</a
                >
              </li>
              <li>
                <a
                  class="h5"
                  target="_blank"
                  href="https://github.com/ga503306"
                  ><i class="mr-1 fab fa-github"></i>github</a
                >
              </li>
            </ul>
          </div>
          <p class="text-center mt-2">
            後端工程師 <br />
            <b class="h5">黃子庭</b>
          </p>
        </div>
        <div class="col-8 col-md-3 col-sm-4">
          <div class="hoverPic position-relative rounded-circle">
            <img
              class="img-fluid border rounded-circle bg-white position-relative"
              src="../assets/img/logodesigner.png"
              alt="LOGO 設計師-黃X庭"
            />
            <ul
              class="hoverInfo mb-0 pt-2 pb-4 list-unstyled text-light position-absolute text-center"
            >
              <li>
                <a
                  class="h5"
                  target="_blank"
                  href="https://www.plurk.com/imhue38"
                  ><i class="mr-1 fas fa-link"></i>Plurk</a
                >
              </li>
            </ul>
          </div>
          <p class="text-center mt-2">
            LOGO 設計 <br />
            <b class="h5">Hue</b>
          </p>
        </div>
      </div>

      <div class="bg-white p-4 my-2">
        <p>
          歡迎來到PET
          TRIP寵物寄宿平台，為了使飼主能夠更快速、更安心的尋找合法的寵物寄宿廠商，並且讓寵物寄宿廠商有個完善的曝光平台，此平台正式於
          2020 年誕生。
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about {
  transition: all 1s;
}
.hoverPic {
  overflow: hidden;
  &:hover > .hoverInfo {
    bottom: 0;
  }
}
.hoverInfo {
  background: rgba($color: #000000, $alpha: 0.7);
  transition: all 1s;
  bottom: -90%;
  right: 0;
  left: 0;
  z-index: 1;
}
</style>
<script>
/* global $ */
export default {
  created () {
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top
      },
      0
    )
  }
}
</script>
