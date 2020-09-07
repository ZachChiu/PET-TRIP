<template>
  <div class="firmRoom py-5">
    <div
      class="delModal modal fade"
      id="delModal"
      tabindex="-1"
      aria-labelledby="delModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white" id="delModalLabel">刪除</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">確定要刪除子庭的家A01</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger">確定</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="editModal modal fade"
      data-backdrop="static"
      data-keyboard="false"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
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
                  <input type="text" class="form-control" id="spaceName" placeholder="子庭毛毛屋A01" />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-lg-2 col-form-label" for="spaceIntroduce">空間介紹</label>
                <div class="col-sm-9 col-lg-10">
                  <textarea class="form-control" id="spaceIntroduce" rows="3"></textarea>
                </div>
              </div>
              <hr />
              <div class="form-group row mb-0">
                <div class="col-lg-6">
                  <div class="form-group align-items-center row">
                    <label class="col-sm-3 col-lg-4 col-form-label" for="petType">寵物類型</label>
                    <div class="col-sm-9 col-lg-8">
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
                        />
                        <input
                          type="number"
                          aria-label="Last name"
                          class="form-control"
                          placeholder="最高公斤數"
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
                      <input type="number" class="form-control" id="perNum" placeholder="幾隻" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-lg-4 col-form-label" for="roomPrice">每日價格</label>
                    <div class="col-sm-9 col-lg-8">
                      <input type="number" class="form-control" id="roomPrice" placeholder="價格" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-lg-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-lg-4 col-form-label" for="perPrice">額外加價</label>
                    <div class="col-sm-9 col-lg-8">
                      <input type="number" class="form-control" id="perPrice" placeholder="每多一隻的價格" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-lg-4 col-form-label" for="walk">散步次數/天</label>
                    <div class="col-sm-9 col-lg-8">
                      <input type="number" class="form-control" id="walk" placeholder="次數" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-lg-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-lg-4 col-form-label" for="can">提供罐頭</label>
                    <div class="col-sm-9 col-lg-8">
                      <select class="form-control" name id="can">
                        <option value selected disabled>請選擇</option>
                        <option value="yes">有</option>
                        <option value="no">無</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-lg-4 col-form-label" for="feed">提供飼料</label>
                    <div class="col-sm-9 col-lg-8">
                      <select class="form-control" name id="feed">
                        <option value selected disabled>請選擇</option>
                        <option value="yes">有</option>
                        <option value="no">無</option>
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
                      <select class="form-control" name id="catLitter">
                        <option value selected disabled>請選擇</option>
                        <option value="yes">有</option>
                        <option value="no">無</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-lg-4 col-form-label" for="visit">看管程度</label>
                    <div class="col-sm-9 col-lg-8">
                      <select class="form-control" name id="visit">
                        <option value selected disabled>請選擇</option>
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
                        />
                        <label class="form-check-label" for="insideFeed">飼料內</label>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with checkbox"
                      disabled
                      placeholder="加購價"
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
                        />
                        <label class="form-check-label" for="pill">餵藥丸</label>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with checkbox"
                      disabled
                      placeholder="加購價"
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
                          checked
                        />
                        <label class="form-check-label" for="outside">外用藥</label>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with checkbox"
                      placeholder="加購價"
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
                        />
                        <label class="form-check-label" for="bath">洗香香</label>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with checkbox"
                      disabled
                      placeholder="加購價"
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
                          checked
                        />
                        <label class="form-check-label" for="haircut">剪毛髮</label>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with checkbox"
                      placeholder="加購價"
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
                        />
                        <label class="form-check-label" for="nailscut">剪指甲</label>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with checkbox"
                      disabled
                      placeholder="加購價"
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
                    <label for="upload1" class="w-100 mb-0 btn btn-dark">
                      空間照片1上傳
                      <input type="file" id="upload1" class="d-none" />
                    </label>
                  </div>
                  <img
                    src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                    class="my-3 w-100 img-fluid"
                    alt
                  />
                </div>
                <div class="col-lg-5">
                  <div class="form-group mb-0 d-flex">
                    <label for="upload2" class="w-100 mb-0 btn btn-dark">
                      空間照片2上傳
                      <input type="file" id="upload2" class="d-none" />
                    </label>
                  </div>
                  <img
                    src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                    class="my-3 w-100 img-fluid"
                    alt
                  />
                </div>
                <div class="col-lg-5">
                  <div class="form-group mb-0 d-flex">
                    <label for="upload3" class="w-100 mb-0 btn btn-dark">
                      空間照片3上傳
                      <input type="file" id="upload3" class="d-none" />
                    </label>
                  </div>
                  <img
                    src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                    class="my-3 w-100 img-fluid"
                    alt
                  />
                </div>
                <div class="col-lg-5">
                  <div class="form-group mb-0 d-flex">
                    <label for="upload4" class="w-100 mb-0 btn btn-dark">
                      空間照片4上傳
                      <input type="file" id="upload4" class="d-none" />
                    </label>
                  </div>
                  <img
                    src="https://upload.cc/i1/2020/09/01/IaZYfp.png"
                    class="my-3 w-100 img-fluid"
                    alt
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-dark">確定</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row no-gutters overflow-hidden position-relative">
        <div class="col-12 mx-auto py-5 position-relative">
          <button
            type="button"
            class="addRoomBtn btn btn-danger position-absolute"
            data-toggle="modal"
            data-target="#editModal"
          >新增空間</button>
          <div class="table-responsive-xl">
            <table class="table text-nowrap border rounded table-hover">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">空間名稱</th>
                  <th scope="col">寵物類型</th>
                  <th scope="col">狀態</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">子庭的家A01</th>
                  <td>貓</td>
                  <td>
                    <div class="custom-control custom-switch">
                      <input class="custom-control-input" type="checkbox" id="on1" checked />
                      <label class="custom-control-label" for="on1">已上線</label>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        data-toggle="modal"
                        data-target="#editModal"
                      >編輯</button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        data-toggle="modal"
                        data-target="#delModal"
                      >刪除</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">子庭的家A02</th>
                  <td>貓</td>
                  <td>
                    <div class="custom-control custom-switch">
                      <input class="custom-control-input" type="checkbox" id="on2" />
                      <label class="custom-control-label" for="on2">未上線</label>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        data-toggle="modal"
                        data-target="#editModal"
                      >編輯</button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        data-toggle="modal"
                        data-target="#delModal"
                      >刪除</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">子庭的家A03</th>
                  <td>貓</td>
                  <td>
                    <div class="custom-control custom-switch">
                      <input class="custom-control-input" type="checkbox" id="on3" checked />
                      <label class="custom-control-label" for="on3">已上線</label>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        data-toggle="modal"
                        data-target="#editModal"
                      >編輯</button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        data-toggle="modal"
                        data-target="#delModal"
                      >刪除</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.addRoomBtn {
  top: 0;
  right: 0;
}
</style>
