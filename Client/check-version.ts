
/** Auto Refresh Page On Application Change */
export class AutoRefresh {

    CurrentVersion: string = "";

    CheckVersion() {
        let AUR = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (AUR.CurrentVersion == "") {
                    AUR.CurrentVersion = this.responseText;
                    console.log(AUR.CurrentVersion);
                    return;
                }
                if (AUR.CurrentVersion != this.responseText) {
                    var plines = AUR.CurrentVersion.split("\n");
                    var newlines = this.responseText.split("\n");

                    newlines.forEach((line, i) => {
                        if (line != plines[i]) {

                            if (line.indexOf("css") > 0) {
                                var r = document.getElementById("main-style") as HTMLElement;
                                var tbr = r.getAttribute("href") as string;
                                r.setAttribute("href", tbr.substring(0, tbr.indexOf("=") + 1) + new Date().getTime())
                            }
                            else {
                                window.location.reload()
                            }

                            AUR.CurrentVersion = this.responseText;
                        }
                    });


                }

            }
        };
        xhttp.open('GET', '/build', true);
        xhttp.send();

    }

    CyclarCheck() {
        setInterval(() => {
            this.CheckVersion()
        }, 5000);
    }

}


(function () {
    if (window.location.hostname == "localhost") {
        var AUR = new AutoRefresh();
        AUR.CyclarCheck();
    }
})


