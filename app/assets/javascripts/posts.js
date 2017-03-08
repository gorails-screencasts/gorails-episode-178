$(document).on("turbolinks:load", function() {
  var selectizeCallback = null;

  $(".category-modal").on("hide.bs.modal", function(e) {
    if (selectizeCallback != null) {
      selectizeCallback();
      selecitzeCallback = null;
    }

    $("#new_category").trigger("reset");
    $.rails.enableFormElements($("#new_category"));
  });

  $("#new_category").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: $(this).attr("action"),
      data: $(this).serialize(),
      success: function(response) {
        selectizeCallback({value: response.id, text: response.name});
        selectizeCallback = null;

        $(".category-modal").modal('toggle');
      }
    });
  });

  $(".selectize").selectize({
    create: function(input, callback) {
      selectizeCallback = callback;

      $(".category-modal").modal();
      $("#category_name").val(input);
    }
  });
});
