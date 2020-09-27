<template>
  <div
    class="editModal modal fade"
    data-backdrop="static"
    data-keyboard="false"
    id="editModal"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div id="editModal" class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="editModalLabel">編輯空間</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-3 col-lg-2 col-form-label" for="spaceName">空間名稱</label>
              <div class="col-sm-9 col-lg-10">
                <input
                  type="text"
                  class="form-control"
                  id="spaceName"
                  placeholder="奢華喵喵毛毛屋A01"
                  v-model="dataList.roomname"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-lg-2 col-form-label" for="spaceIntroduce">空間介紹</label>
              <div class="col-sm-9 col-lg-10">
                <textarea
                  class="form-control"
                  id="spaceIntroduce"
                  rows="3"
                  v-model="dataList.introduce"
                ></textarea>
              </div>
            </div>
            <hr />
            <div class="form-group row mb-0">
              <div class="col-lg-6">
                <div class="form-group align-items-center row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="petType">寵物類型</label>
                  <div class="col-sm-9 col-lg-8">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="cat"
                        value="cat"
                        v-model="dataList.pettype_cat"
                      />
                      <label class="form-check-label" for="cat">貓</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="bog"
                        value="dog"
                        v-model="dataList.pettype_dog"
                      />
                      <label class="form-check-label" for="bog">狗</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="other"
                        value="other"
                        v-model="dataList.pettype_other"
                      />
                      <label class="form-check-label" for="other">其他</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="petSize">接受重量</label>
                  <div class="col-sm-9 col-lg-8">
                    <div class="input-group">
                      <input
                        type="number"
                        aria-label="First name"
                        class="form-control"
                        placeholder="最低公斤數"
                        v-model="dataList.petsizes"
                      />
                      <input
                        type="number"
                        aria-label="Last name"
                        class="form-control"
                        placeholder="最高公斤數"
                        v-model="dataList.petsizee"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="perNum">可容納數量</label>
                  <div class="col-sm-9 col-lg-8">
                    <input
                      type="number"
                      class="form-control"
                      id="perNum"
                      placeholder="幾隻"
                      v-model="dataList.roomamount"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="roomPrice">每日價格</label>
                  <div class="col-sm-9 col-lg-8">
                    <input
                      type="number"
                      class="form-control"
                      id="roomPrice"
                      placeholder="價格"
                      v-model="dataList.roomprice"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="perPrice">額外加價/隻</label>
                  <div class="col-sm-9 col-lg-8">
                    <input
                      type="number"
                      class="form-control"
                      id="perPrice"
                      placeholder="每多一隻的價格"
                      v-model="dataList.roomamount_amt"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="walk">散步次數/天</label>
                  <div class="col-sm-9 col-lg-8">
                    <input
                      type="number"
                      class="form-control"
                      id="walk"
                      placeholder="次數"
                      v-model="dataList.walk"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="can">提供罐頭</label>
                  <div class="col-sm-9 col-lg-8">
                    <select class="form-control" name id="can" v-model="dataList.canned">
                      <option value selected disabled>請選擇</option>
                      <option value="true">有</option>
                      <option value="false">無</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="feed">提供飼料</label>
                  <div class="col-sm-9 col-lg-8">
                    <select class="form-control" name id="feed" v-model="dataList.feed">
                      <option value selected disabled>請選擇</option>
                      <option value="true">有</option>
                      <option value="false">無</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="catLitter">提供貓砂</label>
                  <div class="col-sm-9 col-lg-8">
                    <select class="form-control" name id="catLitter" v-model="dataList.catlitter">
                      <option value selected disabled>請選擇</option>
                      <option value="true">有</option>
                      <option value="false">無</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group row">
                  <label class="col-sm-3 col-lg-4 col-form-label" for="visit">看管程度</label>
                  <div class="col-sm-9 col-lg-8">
                    <select class="form-control" name id="visit" v-model="dataList.visit">
                      <option value="0" selected disabled>請選擇</option>
                      <option value="24">24小時</option>
                      <option value="22">22小時</option>
                      <option value="20">20小時</option>
                      <option value="18">18小時</option>
                      <option value="16">16小時</option>
                      <option value="14">14小時</option>
                      <option value="12">12小時</option>
                      <option value="10">10小時</option>
                      <option value="8">8小時</option>
                      <option value="7">8小時以下</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div
              class="form-group align-items-center justify-content-lg-start justify-content-end row"
            >
              <label class="col-sm-3 col-lg-2 col-form-label" for="petType">餵藥服務</label>
              <div class="col-sm-9 col-lg-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input
                        type="checkbox"
                        id="insideFeed"
                        aria-label="Checkbox for following text input"
                        :checked="dataList.medicine_infeed"
                        v-model="dataList.medicine_infeed"
                      />
                      <label class="form-check-label" for="insideFeed">飼料內</label>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with checkbox"
                    placeholder="加購價"
                    v-model="dataList.medicine_infeed_amt"
                    :disabled="!dataList.medicine_infeed"
                  />
                </div>
              </div>
              <div class="col-sm-9 col-lg-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input
                        type="checkbox"
                        id="pill"
                        aria-label="Checkbox for following text input"
                        :checked="dataList.medicine_pill"
                        v-model="dataList.medicine_pill"
                      />
                      <label class="form-check-label" for="pill">餵藥丸</label>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with checkbox"
                    placeholder="加購價"
                    v-model="dataList.medicine_pill_amt"
                    :disabled="!dataList.medicine_pill"
                  />
                </div>
              </div>
              <div class="col-sm-9 col-lg-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input
                        type="checkbox"
                        id="outside"
                        aria-label="Checkbox for following text input"
                        :checked="dataList.medicine_paste"
                        v-model="dataList.medicine_paste"
                      />
                      <label class="form-check-label" for="outside">外用藥</label>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with checkbox"
                    placeholder="加購價"
                    v-model="dataList.medicine_paste_amt"
                    :disabled="!dataList.medicine_paste"
                  />
                </div>
              </div>
            </div>
            <div
              class="form-group align-items-center justify-content-lg-start justify-content-end row"
            >
              <label class="col-sm-3 col-lg-2 col-form-label" for="petType">加購項目</label>
              <div class="col-sm-9 col-lg-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input
                        type="checkbox"
                        id="bath"
                        aria-label="Checkbox for following text input"
                        :checked="dataList.bath"
                        v-model="dataList.bath"
                      />
                      <label class="form-check-label" for="bath">洗香香</label>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with checkbox"
                    placeholder="加購價"
                    v-model="dataList.bath_amt"
                    :disabled="!dataList.bath"
                  />
                </div>
              </div>
              <div class="col-sm-9 col-lg-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input
                        type="checkbox"
                        id="haircut"
                        aria-label="Checkbox for following text input"
                        :checked="dataList.hair"
                        v-model="dataList.hair"
                      />
                      <label class="form-check-label" for="haircut">剪毛髮</label>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with checkbox"
                    placeholder="加購價"
                    v-model="dataList.hair_amt"
                    :disabled="!dataList.hair"
                  />
                </div>
              </div>
              <div class="col-sm-9 col-lg-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input
                        type="checkbox"
                        id="nailscut"
                        aria-label="Checkbox for following text input"
                        :checked="dataList.nails"
                        v-model="dataList.nails"
                      />
                      <label class="form-check-label" for="nailscut">剪指甲</label>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with checkbox"
                    placeholder="加購價"
                    v-model="dataList.nails_amt"
                    :disabled="!dataList.nails"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div
              class="form-group justify-content-start justify-content-lg-end align-items-center row"
            >
              <label class="col-sm-3 col-lg-2 col-form-label" for="spaceIntroduce">空間照片</label>
              <div class="col-lg-5">
                <div class="form-group mb-0 d-flex">
                  <label
                    for="upload1"
                    class="w-100 mb-0 btn btn-dark"
                    :class="{disabled:load.imgLoad1}"
                  >
                    <i v-if="load.imgLoad1" class="mr-1 fas fa-spinner fa-spin"></i>空間照片1上傳
                    <input
                      type="file"
                      id="upload1"
                      class="d-none"
                      :disabled="load.imgLoad1"
                      @change="uploadImg('1')"
                    />
                  </label>
                </div>
                <div
                  class="my-3 mx-auto overflow-hidden"
                  :style="{backgroundImage: 'url(' + dataList.img1 + ')'}"
                  style="background-size: cover;background-position:center"
                >
                  <img
                    src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                    :class="{opacityZero:dataList.img1 != ''}"
                    class="w-100 img-fluid"
                  />
                </div>
              </div>
              <div class="col-lg-5">
                <div class="form-group mb-0 d-flex">
                  <label
                    for="upload2"
                    class="w-100 mb-0 btn btn-dark"
                    :class="{disabled:load.imgLoad2}"
                  >
                    <i v-if="load.imgLoad2" class="mr-1 fas fa-spinner fa-spin"></i>空間照片2上傳
                    <input
                      type="file"
                      id="upload2"
                      class="d-none"
                      :disabled="load.imgLoad2"
                      @change="uploadImg('2')"
                    />
                  </label>
                </div>
                <div
                  class="my-3 mx-auto overflow-hidden"
                  :style="{backgroundImage: 'url(' + dataList.img2 + ')'}"
                  style="background-size: cover;background-position:center"
                >
                  <img
                    src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                    :class="{opacityZero:dataList.img2 != ''}"
                    class="w-100 img-fluid"
                  />
                </div>
              </div>
              <div class="col-lg-5">
                <div class="form-group mb-0 d-flex">
                  <label
                    for="upload3"
                    class="w-100 mb-0 btn btn-dark"
                    :class="{disabled:load.imgLoad3}"
                  >
                    <i v-if="load.imgLoad3" class="mr-1 fas fa-spinner fa-spin"></i>空間照片3上傳
                    <input
                      type="file"
                      id="upload3"
                      class="d-none"
                      :disabled="load.imgLoad3"
                      @change="uploadImg('3')"
                    />
                  </label>
                </div>
                <div
                  class="my-3 mx-auto overflow-hidden"
                  :style="{backgroundImage: 'url(' + dataList.img3 + ')'}"
                  style="background-size: cover;background-position:center"
                >
                  <img
                    src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                    :class="{opacityZero:dataList.img3 != ''}"
                    class="w-100 img-fluid"
                  />
                </div>
              </div>
              <div class="col-lg-5">
                <div class="form-group mb-0 d-flex">
                  <label
                    for="upload4"
                    class="w-100 mb-0 btn btn-dark"
                    :class="{disabled:load.imgLoad4}"
                  >
                    <i v-if="load.imgLoad4" class="mr-1 fas fa-spinner fa-spin"></i>空間照片4上傳
                    <input
                      type="file"
                      id="upload4"
                      class="d-none"
                      :disabled="load.imgLoad4"
                      @change="uploadImg('4')"
                    />
                  </label>
                </div>
                <div
                  class="my-3 mx-auto overflow-hidden"
                  :style="{backgroundImage: 'url(' + dataList.img4 + ')'}"
                  style="background-size: cover;background-position:center"
                >
                  <img
                    src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                    :class="{opacityZero:dataList.img4 != ''}"
                    class="w-100 img-fluid"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button
            type="button"
            class="btn btn-dark"
            @click="saveRoomData"
            :disabled="loading || load.imgLoad1 || load.imgLoad2 || load.imgLoad3 || load.imgLoad4"
          >
            <i v-if="loading" class="mr-1 fas fa-spinner fa-spin"></i>確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
  data () {
    return {
      load: {
        imgLoad1: false,
        imgLoad2: false,
        imgLoad3: false,
        imgLoad4: false
      },
      dataList: this.temData,
      loading: false
    }
  },
  name: 'roomModal',
  props: ['temData', 'modalStatus'],
  watch: {
    temData: function (newVal, oldVal) {
      this.dataList = newVal
    }
  },
  methods: {
    saveRoomData: function () {
      const { ...data } = this.dataList
      const vm = this
      vm.loading = true
      const config = {
        method: 'post',
        url: 'http://pettrip.rocket-coding.com/api/Room/Create'
      }
      if (this.modalStatus === 'edit') {
        config.method = 'patch'
        config.url = 'http://pettrip.rocket-coding.com/api/Room/Edit'
      }
      config.data = data
      // {
      //   roomseq: `${this.dataList.roomseq}`,
      //   roomname: `${this.dataList.roomname}`,
      //   introduce: `${this.dataList.introduce}`,
      //   pettype_cat: this.dataList.pettype_cat,
      //   pettype_dog: this.dataList.pettype_dog,
      //   pettype_other: this.dataList.pettype_other,
      //   petsizes: `${this.dataList.petsizes}`,
      //   petsizee: `${this.dataList.petsizee}`,
      //   roomamount: `${this.dataList.roomamount}`,
      //   roomprice: `${this.dataList.roomprice}`,
      //   roomamount_amt: `${this.dataList.roomamount_amt}`,
      //   walk: `${this.dataList.walk}`,
      //   canned: this.dataList.canned,
      //   feed: this.dataList.feed,
      //   catlitter: this.dataList.catlitter,
      //   visit: `${this.dataList.visit}`,
      //   medicine_infeed: this.dataList.medicine_infeed,
      //   medicine_infeed_amt: `${this.dataList.medicine_infeed_amt}`,
      //   medicine_pill: this.dataList.medicine_pill,
      //   medicine_pill_amt: `${this.dataList.medicine_pill_amt}`,
      //   medicine_paste: this.dataList.medicine_paste,
      //   medicine_paste_amt: `${this.dataList.medicine_paste_amt}`,
      //   bath: this.dataList.bath,
      //   bath_amt: `${this.dataList.bath_amt}`,
      //   hair: this.dataList.hair,
      //   hair_amt: `${this.dataList.hair_amt}`,
      //   nails: this.dataList.nails,
      //   nails_amt: `${this.dataList.nails_amt}`,
      //   img1: `${this.dataList.img1}`,
      //   img2: `${this.dataList.img2}`,
      //   img3: `${this.dataList.img3}`,
      //   img4: `${this.dataList.img4}`
      // }
      this.$http(config)
        .then(function (response) {
          if (response.data.result === '修改成功') {
            Swal.fire({
              icon: 'success',
              title: '修改成功',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            })
            $('#editModal').modal('hide')
            vm.$emit('get-data')
          } else if (response.data.result === '上架成功') {
            Swal.fire({
              icon: 'success',
              title: '上架成功',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            })
            $('#editModal').modal('hide')
            vm.$emit('get-data')
          } else {
            Swal.fire({
              icon: 'error',
              title: response.data.result,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            })
          }
          vm.loading = false
        })
        .catch(function () {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: '上架失敗',
            showConfirmButton: false,
            timer: 2000
          })
          vm.loading = false
        })
    },
    uploadImg: function (num) {
      const vm = this
      const uploadedFile = event.target.files[0]
      if (uploadedFile === undefined) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'info',
          title: '未選擇檔案',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.load[`imgLoad${num}`] = true
        const formData = new FormData()
        formData.append('file', uploadedFile)
        const url = 'http://pettrip.rocket-coding.com/api/Uploadimg'
        this.FirmPicUploading = true
        this.$http
          .post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            this.FirmPicUploading = false
            vm.load[`imgLoad${num}`] = false
            if (
              response.data.result === 'Uploadimg錯誤，請至伺服器log查詢錯誤訊息'
            ) {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: '請上傳小於 2MB 的圖檔',
                showConfirmButton: false,
                timer: 2000
              })
            } else {
              this.dataList[`img${num}`] = response.data.result
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: '上傳成功',
                showConfirmButton: false,
                timer: 2000
              })
            }
          })
          .catch(() => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: '請上傳小於 2MB 的圖檔',
              showConfirmButton: false,
              timer: 2000
            })
            this.FirmPicUploading = false
            vm.load[`imgLoad${num}`] = false
          })
      }
    }
  }
}
</script>
