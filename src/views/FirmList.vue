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
                <label class="col-lg-3 col-form-label" for="petNum">寵物數量</label>
                <div class="col-lg-9">
                  <select id="petNum" class="form-control">
                    <option value selected disabled>請選擇</option>
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
                <label class="col-lg-3 col-form-label" for="petWeight">接受重量</label>
                <div class="col-lg-9">
                  <select id="petWeight" class="form-control">
                    <option value selected disabled>請選擇</option>
                    <option value="5">5以下</option>
                    <option value="10">10以下</option>
                    <option value="15">15以下</option>
                    <option value="20">20以下</option>
                    <option value="25">25以下</option>
                    <option value="30">25以上</option>
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
                  <vc-date-picker mode="range" v-model="range" :min-date="new Date()" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="container py-5">
      <div class="row justify-content-lg-start justify-content-md-between">
        <div class="col-lg-4 col-md-5 mb-3" v-for="(firm,index) in firmList" :key="index">
          <div class="card w-100">
            <div
                    class="w-100"
                    :style="{backgroundImage: 'url(' + firm.bannerimg + ')'}"
                    style="background-size: cover;"
                  >
                    <img
                      src="https://upload.cc/i1/2020/09/09/GIaohq.jpg"
                      :class="{opacityZero:firm.bannerimg != ''}"
                      class="card-img-top"
                      alt
                    />
                  </div>
            <div class="card-body">
              <div class="row align-items-start">
                <div class="col-5">
                  <div
                    class="rounded-circle mx-auto overflow-hidden"
                    :style="{backgroundImage: 'url(' + firm.avatar + ')'}"
                    style="background-size: cover;max-width: 300px;"
                  >
                    <img
                      src="https://upload.cc/i1/2020/09/09/wa8QmM.png"
                      :class="{opacityZero:firm.avatar != ''}"
                      class="w-100 img-fluid"
                      alt
                    />
                  </div>
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
                  <h5 class="card-title">{{firm.companybrand}}</h5>
                  <p class="mb-1 card-text">{{firm.country}},{{firm.area}}</p>
                  <p class="mb-1 card-text">{{firm.pettype}}</p>
                  <p class="mb-1 card-text text-secondary">共有{{firm.rooms}}間房間</p>
                  <p class="mb-1 card-text text-danger">
                    $ {{firm.roomprice_min}}
                    <span v-if="firm.roomprice_min != firm.roomprice_max">~{{firm.roomprice_max}}</span> / 天
                  </p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <router-link :to="`/FirmPage/${firm.companyseq}`" class="stretched-link w-100 btn btn-primary">查看詳情</router-link>
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

<script>
export default {
  data () {
    return {
      range: {},
      firmList: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData: function () {
      const vm = this
      const config = {
        method: 'get',
        url: 'http://pettrip.rocket-coding.com/api/Room/GetCompanys?page=1'
      }
      this.$http(config)
        .then(function (response) {
          console.log(response)
          vm.firmList = response.data.companies
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
