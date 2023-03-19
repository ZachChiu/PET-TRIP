<template>
  <div class="common">
    <div class="commonList container py-4 ">
      <div class="row">
        <div class="col-11 col-md-8 bg-white border mx-auto py-4">
          <h3 class="text-center mb-3">問題列表</h3>
          <div id="accordionExample" class="accordion">
            <div class="card">
              <div id="headingOne" class="card-header">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Q1.哪些狗狗/貓咪無法使用寵物住宿?
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  A1.患有重大疾病、患有傳染疾病之狗狗/貓咪，恕無法預定此服務。
                </div>
              </div>
            </div>
            <div class="card">
              <div id="headingTwo" class="card-header">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Q2.寵物曾患有疾病，是否能使用寵物住宿？
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  A2.基於寵物安全，建議曾患有疾病之寵物住宿前，請致電寵物店評估，再預定此服務；如寵物患有疾病未與寵物店確認、預訂此服務，視同違反住宿條件，寵物店將協助飼主取消此服務，飼主不得有議。
                </div>
              </div>
            </div>
            <div class="card">
              <div id="headingThree" class="card-header">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link  btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Q3.寵物住宿預定錯誤，可以變更訂單嗎？
                  </button>
                </h2>
              </div>
              <div
                id="collapseThree"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  A3.請至「訂單查詢」進行取消，並重新下訂單。
                </div>
              </div>
            </div>
            <div class="card">
              <div id="headingFour" class="card-header">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link  btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Q4.為什麼我的訂單無法取消？
                  </button>
                </h2>
              </div>
              <div
                id="collapseFour"
                class="collapse"
                aria-labelledby="headingFour"
                data-parent="#accordionExample"
              >
                <div class="card-body">A4.入住前七天無法取消訂單。</div>
              </div>
            </div>
            <div class="card">
              <div id="headingFive" class="card-header">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link  btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Q5.退費的規範為何？
                  </button>
                </h2>
              </div>
              <div
                id="collapseFive"
                class="collapse"
                aria-labelledby="headingFive"
                data-parent="#accordionExample"
              >
                <div class="card-body">A5.七天以前，全額退費，權益退回。</div>
              </div>
            </div>
            <div class="card">
              <div id="headingSix" class="card-header">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link  btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    Q6.入住後可以取消訂單嗎？
                  </button>
                </h2>
              </div>
              <div
                id="collapseSix"
                class="collapse"
                aria-labelledby="headingSix"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  A6.已入住，即視同優惠已使用，無法取消訂單及部份住宿天數，若因任何因素提早退房，恕無法退款。
                </div>
              </div>
            </div>
            <div class="card">
              <div id="headingSeven" class="card-header">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link  btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    Q7.入住後發生緊急狀況怎麼處理？
                  </button>
                </h2>
              </div>
              <div
                id="collapseSeven"
                class="collapse"
                aria-labelledby="headingSeven"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  A7.寵物住宿後，因寵物出現焦慮、無法休息、無法進食，為確保寵物身體狀況，由寵物店聯繫飼主/緊急聯絡人接回寵物，因而無法行使寵物住宿：住宿當天費用不退回，權益視同使用、不退回。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  created() {
    $('html, body').animate(
      {
        scrollTop: $('#app').offset().top,
      },
      0
    );
  },
};
</script>
