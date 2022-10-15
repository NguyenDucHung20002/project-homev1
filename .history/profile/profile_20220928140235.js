let flag = true;
$(".show-pass").click(function (e) {
  e.preventDefault();
  const inputShow = $(this).parent();
  if (flag) {
    inputShow.find("input").attr("type", "text");
    inputShow.find("button").html(`<i class="fa-regular fa-eye"></i>`);
    flag = !flag;
  } else if (!flag) {
    inputShow.find("input").attr("type", "password");
    inputShow.find("button").html(`<i class="fa-regular fa-eye-slash"></i>`);
    flag = !flag;
  }
});

$(document).ready(function () {
  //show form password
  $(".btn-change-password").click(function (e) {
    e.preventDefault();
    $(".backgr").css({
      opacity: 1,
      visibility: "visible",
    });
  });
  $(".wrapper-form-password").click(function (e) {
    e.stopPropagation();
  });

  // close form password
  $(".backgr").click(function (e) {
    e.preventDefault();
    $(this).css({
      opacity: 0,
      visibility: "hidden",
    });
  });
  $(".btn-close").click(function (e) {
    e.preventDefault();
    $(".backgr").css({
      opacity: 0,
      visibility: "hidden",
    });
  });

  $(".btn-apply").click(function (e) {
    e.preventDefault();
    const getEmail = $(".input-email");
    const getUsername = $(".input-username");
    $("body").prepend(`
    <div class="form-loading">
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    </div>`);
    fetch("https://getuser.vercel.app/api/getAllUser")
      .then((data) => data.json())
      .then((result) => {
        $("body").find(".form-loading").remove();
        if (getEmail.val() === "" || getUsername.val() === "") {
          alert("Input can not be empty");
        } else {
          let checkEmail = true;
          const findNameUser = result.findIndex(
            (val) => val.name === dataUser.name
          );
          const findEmailUser = result.findIndex(
            (val) => val.email === dataUser.email
          );
          if (findEmailUser !== -1) {
            alert("Email already exists");
            checkEmail = false;
          }
          if (findNameUser !== -1 && checkEmail === true) {
            alert("Username already exists");
            checkPassword = false;
          }
        }
      });
  });
});
