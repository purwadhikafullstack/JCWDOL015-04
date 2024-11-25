const openCageApi = process.env.OPENCAGE_API_KEY;

export async function fetchUserLocation(
  setLocation: (location: { latitude: number; longitude: number }) => void,
  setLocationAccessDenied: (denied: boolean) => void,
) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageApi}`,
          );
          const data = await response.json();
          const location = data.results[0].formatted;

          setLocation({ latitude, longitude });
        } catch (error) {
        }
      },
      (error) => {
        setLocationAccessDenied(true);
      },
    );
  } else {
    setLocationAccessDenied(true);
  }
}
