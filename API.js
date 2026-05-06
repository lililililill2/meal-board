const updateBtn = document.getElementById("update");

updateBtn.addEventListener("click", async function () {
  const breakfast = document.getElementById("breakfast-list");
  const lunch = document.getElementById("lunch-list");
  const dinner = document.getElementById("dinner-list");
  const dateText = document.getElementById("frame2_text_1");
  const timeText = document.getElementById("frame2_text_2");
  const titleText = document.getElementById("frame85_text");

  breakfast.innerText = "로딩중...";
  lunch.innerText = "로딩중...";
  dinner.innerText = "로딩중...";

  try {
    const today = new Date();

    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const h = String(today.getHours()).padStart(2, "0");
    const min = String(today.getMinutes()).padStart(2, "0");
    const s = String(today.getSeconds()).padStart(2, "0");

    const ymd = `${y}${m}${d}`;

    dateText.innerText = `${y} - ${m} - ${d}`;
    timeText.innerText = `${h} : ${min} : ${s}`;
    titleText.innerText = `${Number(m)}월 ${Number(d)}일 광주 소마고의`;

    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API.API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&MLSV_YMD=${ymd}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("API 요청을 실패했습니다");
    }

    const data = await res.json();

    if (!data.mealServiceDietInfo) {
      breakfast.innerText = "정보 없음";
      lunch.innerText = "정보 없음";
      dinner.innerText = "정보 없음";
      return;
    }

    function setMealText(text) {
      breakfast.innerText = text;
      lunch.innerText = text;
      dinner.innerText = text;
    }
    setMealText("");

    const meals = data?.mealServiceDietInfo?.[1]?.row;

    meals.forEach(function (meal) {
      const menu = meal.DDISH_NM.replace(/\([0-9.]+\)/g, "")
        .split("<br/>")
        .map(function (item) {
          return '<p class="frame3_text">' + item + "</p>";
        })
        .join("");

      if (meal.MMEAL_SC_CODE === "1") breakfast.innerHTML = menu;
      if (meal.MMEAL_SC_CODE === "2") lunch.innerHTML = menu;
      if (meal.MMEAL_SC_CODE === "3") dinner.innerHTML = menu;
    });
  } catch (err) {
    breakfast.innerText = "에러 발생!";
    lunch.innerText = "에러 발생!";
    dinner.innerText = "에러 발생!";
    console.error;
  }
});
