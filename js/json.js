 document.getElementById("form").addEventListener("submit", function (e) {
      e.preventDefault(); // prevent page reload

      const formData = new FormData(this);
      const jsonObject = {};

      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      document.getElementById("output").textContent = JSON.stringify(jsonObject, null, 2);
    });