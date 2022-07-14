var slide_wrp = '.side-menu-wrapper' //Menu Wrapper
var open_button = '.menu-open' //Menu Open Button
var close_button = '.menu-close' //Menu Close Button
var overlay = '.menu-overlay' //Overlay

$(slide_wrp)
  .hide()
  .css({ right: -$(slide_wrp).outerWidth() + 'px' })
  .delay(50)
  .queue(function () {
    $(slide_wrp).show()
  })

$(open_button).click(function (e) {
  e.preventDefault()
  $(slide_wrp).css({ right: '0px' })
  setTimeout(function () {
    $(slide_wrp).addClass('active')
  }, 50)
  $(overlay).css({ opacity: '1', width: '100%' })
})

$(close_button).click(function (e) {
  e.preventDefault()
  $(slide_wrp).css({ right: -$(slide_wrp).outerWidth() + 'px' })
  setTimeout(function () {
    $(slide_wrp).removeClass('active')
  }, 50)
  $(overlay).css({ opacity: '0', width: '0' })
})

$(document).on('click', function (e) {
  if (!e.target.closest(slide_wrp) && $(slide_wrp).hasClass('active')) {
    $(slide_wrp)
      .css({ right: -$(slide_wrp).outerWidth() + 'px' })
      .removeClass('active')
    $(overlay).css({ opacity: '0', width: '0' })
  }
})

var db = firebase.firestore()
var collections = db.collection('ong')

collections
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      $('#cards-orgs').append(
        "<div class='modal-content-ong'><div class='part4'><img src = 'https://firebasestorage.googleapis.com/v0/b/help-life-96b28.appspot.com/o/users%2F" +
          doc.data().uid +
          "?alt=media'><section><h2>" +
          doc.data().nome +
          /* <a href='chat/index.html' target='_blank' rel='noopener noreferrer'>" +
          "<abbr title='chat'><svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='currentColor' class='bi bi-chat'viewBox='0 0 16 16'><path d='M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z' /></svg>" +
          "</abbr></a> */ "</h2><p>" +
          doc.data().introducao +
          "</p><div><h3>Informações</h3><hr style='height:1px;border-width:0;color:#21489d;background-color:#21489d'>" +
          "<ul class='inf'><li><section><svg class='svg' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor'class='bi bi-person' viewBox='0 0 16 16'><path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' /></svg>" +
          '<span>' +
          doc.data().responsavel +
          "</span></section></li><li><section><svg class='svg' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor'class='bi bi-telephone' viewBox='0 0 16 16'><path d='M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z' /></svg>" +
          '<span>' +
          doc.data().telefone +
          "</span></section></li><li><section><svg class='svg' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-whatsapp' viewBox='0 0 16 16'><path d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z'/></svg>" +
          "<span><a href='http://api.whatsapp.com/send?1=pt_BR&phone=55" +
          doc.data().zap +
          "'>" +
          doc.data().zap +
          "</a></span></section></li><li><section><svg class='svg' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-mailbox' viewBox='0 0 16 16'><path d='M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z' /><path d='M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z' /></svg>" +
          '<span>' +
          doc.data().email +
          "</span></section></li><li><a href='" +
          doc.data().website +
          "' target='_blank'><section><svg class='svg' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-globe' viewBox='0 0 16 16'>" +
          "<path d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z' />" +
          '</svg><span>' +
          doc.data().website +
          '</span></section></a></li>' +
          "<li><section><svg class='svg' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-house-door' viewBox='0 0 16 16'><path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z' /></svg>" +
          '<span>' +
          doc.data().endereco +
          '</span>' +
          "</section></li></ul></div></section></div><hr style='height:1px;border-width:0;color:#21489d;background-color:#21489d;margin:5% 0%;'></div>",
      )
    })
  })
  .catch((error) => {
    console.log('erro: ' + error)
  })
