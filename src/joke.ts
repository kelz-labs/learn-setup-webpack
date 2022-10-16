const joke = () => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const getJoke = async () => {
    const response = await fetch(
      "https://candaan-api.vercel.app/api/text/random",
      config
    );
    const data = await response.json();

    document.getElementById("joke")!.innerHTML = data.data;
  };

  return getJoke();
};

export default joke;
