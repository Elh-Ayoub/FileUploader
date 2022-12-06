const API_URL = "http://localhost:5000";

$(document).ready(function () {
    // fetch documents

    $.ajax({
        type: "GET",
        url: `${API_URL}/api/upload`,
        success: function (response) {
            response.uploads.forEach(element => {
                appendToContainer(element);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });

    $("#uploadInput").on("change", function (e) {
        const data = new FormData();
        var files = e.target.files; 
        for (var i = 0, file; file = files[i]; i++) {
            data.append("files", file);
        }
    
        $.ajax({
            type: "Post",
            url: `${API_URL}/api/upload`,
            data: data,
            processData: false,
            contentType: false,
            success: function (response) {
                // window.location.reload();
                alert("Uploaded successfully!");
                response.files.forEach(element => {
                    appendToContainer(element);
                });
            },
            error: function (error) {
                console.log(error.response);
            }
        });
    });

    const appendToContainer = (path) => {
        const filename = path.split("/")[1];

        $(".filesContainer").append(`
        <div class="col-lg-3 col-xl-2">
            <div class="file-man-box"></a>
                <div class="file-img-box">
                    <img src="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/${filename.split(".")[1]}.svg" 
                    alt="ICON" onerror="this.onerror = null; this.src = 'https://coderthemes.com/adminox/layouts/vertical/assets/images/icons/document.svg'">
                </div>
                <div class="row justify-content-between align-items-center flex-nowrap file-man-title">
                    <h5 class="mb-0 text-overflow">${filename}</h5>
                    <a target="_blank" href="${API_URL + "/api/" + path + "/download"}" class="text-muted" style="width: fit-content;"><i class="fa fa-download"></i></a>
                </div>
            </div>
        </div>`)
    }
});
