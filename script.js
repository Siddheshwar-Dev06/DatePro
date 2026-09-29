
const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");

const yesResponse = document.getElementById("yesResponse");
const maybeResponse = document.getElementById("maybeResponse");

const datePlanner = document.getElementById("datePlanner");
const dateForm = document.getElementById("dateForm");

const dateSummary = document.getElementById("dateSummary");
const editBtn = document.getElementById("editBtn");

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");


// YES BUTTON

yesBtn.addEventListener("click", function () {

    yesResponse.classList.remove("hidden");

    maybeResponse.classList.add("hidden");

    datePlanner.classList.remove("hidden");

    dateSummary.classList.add("hidden");

    yesResponse.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// MAYBE LATER BUTTON

maybeBtn.addEventListener("click", function () {

    maybeResponse.classList.remove("hidden");

    yesResponse.classList.add("hidden");

    datePlanner.classList.add("hidden");

    dateSummary.classList.add("hidden");

    maybeResponse.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// SET MINIMUM DATE TO TODAY

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;


// SAVE DATE DETAILS

dateForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    const cafe = document.getElementById("cafe").value.trim();

    const location = document.getElementById("location").value.trim();

    const mapLink = document.getElementById("mapLink").value.trim();

    const note = document.getElementById("note").value.trim();


    // FORMAT DATE

    const formattedDate = new Date(
        selectedDate + "T00:00:00"
    ).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });


    // FORMAT TIME

    const [hours, minutes] = selectedTime.split(":");

    const formattedTime = new Date(
        2000, 0, 1, Number(hours), Number(minutes)
    ).toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });


    // DISPLAY DETAILS

    document.getElementById("showDate").textContent = formattedDate;

    document.getElementById("showTime").textContent = formattedTime;

    document.getElementById("showCafe").textContent = cafe;

    document.getElementById("showLocation").textContent = location;


    // OPTIONAL NOTE

    const noteRow = document.getElementById("noteRow");

    if (note) {
        document.getElementById("showNote").textContent = note;
        noteRow.classList.remove("hidden");
    } else {
        noteRow.classList.add("hidden");
    }


    // GOOGLE MAPS LINK

    const mapButton = document.getElementById("mapButton");

    if (mapLink) {

        try {
            const parsedUrl = new URL(mapLink);

            if (parsedUrl.protocol === "https:" ||
                parsedUrl.protocol === "http:") {

                mapButton.href = parsedUrl.href;
                mapButton.classList.remove("hidden");

            } else {
                mapButton.classList.add("hidden");
            }

        } catch {
            mapButton.classList.add("hidden");
        }

    } else {

        mapButton.href =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(cafe + " " + location);

        mapButton.classList.remove("hidden");
    }


    // SHOW FINAL SUMMARY

    datePlanner.classList.add("hidden");

    dateSummary.classList.remove("hidden");

    dateSummary.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// EDIT DATE DETAILS

editBtn.addEventListener("click", function () {

    dateSummary.classList.add("hidden");

    datePlanner.classList.remove("hidden");

    datePlanner.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});