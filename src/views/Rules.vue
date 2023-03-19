<template>
  <div class="rules">
    <div class="banner position-relative">
      <div
        class="bannerText position-absolute text-dark display-4 font-weight-bold"
      >
        服務條款
      </div>
      <img
        class="img-fluid"
        src="https://upload.cc/i1/2020/09/02/JE5b96.png"
        style="height: 200px; object-fit: cover; width: 100%"
        alt
      />
    </div>
    <div class="container my-4  ">
      <div class="row">
        <div class="col-11 col-md-8 bg-white border mx-auto py-4">
          <p>誠摯感謝您利用 Pet Trip 網站（以下簡稱本網站）。</p>
          <p>本網站由高雄市火箭隊培訓營（以下簡稱「本公司」）營運管理。</p>
          <hr />
          <h4 class="mt-5">使用條款</h4>
          <p>
            在您開始瀏覽本網站前，請先詳讀本使用條款。如您已使用本網站時，即表示您已詳讀、瞭解並同意接受本使用條款之所有內容。此外，本使用條款得由本公司不經預告逕行變更，請自行確認本使用條款之最新內容。
          </p>
          <hr />
          <h5 class="mb-3 mt-5">[ 同意事項 ]</h5>
          <ul class="list-unstyled">
            <li>
              <p class="font-weight-bold">1. 知識產權</p>
              <p>
                本網站所有內容，包括但不限於文章、照片、影像、音樂及設計，均由本公司或本公司授權之使用者依法享有知識產權，包括但並不限於著作權(版權)。本網站上所有內容，皆受各國的知識產權法、條約及相關法律保護。使用者對於本網站內容之使用，皆須遵守法律之明文限制，除以非牟利用途並以觀賞用途下載，列印外，嚴禁重製、傳播、刊登、傳送、刪除、變更、改作等逾越法律限制之利用。
              </p>
            </li>
            <li>
              <p class="font-weight-bold">2. 免責事項</p>
              <p>
                本公司謹慎注意本網站的營運管理，惟不保證資訊及動作的正確性與完整性，或本網站之運作不受中斷。因使用本網站，或是基於任何原因而無法使用本網站所產生的損害，本公司於適用法律所准許之最大限度內概不負責。
                此外，針對任何利用本網站所生軟體或硬體上之問題或損害，本公司不負任何責任。同時，本網站所刊登的資訊為刊登當時的資訊，故可能出現和現狀不同或已銷售完畢商品之資訊，尚請留意。
              </p>
            </li>
            <li>
              <p class="font-weight-bold">3. 關於禁止事項</p>
              <p>
                禁止一切會對第三人或本公司造成損害之行為，違反公序良俗、以營利為目的之行為，及有造成上述情形之虞的行為亦在禁止之列。
              </p>
            </li>
          </ul>
          <hr />
          <p class="mt-5">
            <small class="text-muted"
              >※本使用條款之解釋與適用，以及與本使用條款有關的爭議，除另有雙方約定或本使用條款其他記載者，即依該約定或記載以外，均依照中華民國法律處理。高雄高等行政法院對有關爭議具非專屬司法管轄權。
            </small>
          </p>
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
