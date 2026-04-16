import axios from "axios";
import { progress } from "motion/react";

const getCurrentLocation = () => {

    const  OpenCageKey = progress.env.OpenCage_KEY
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      try {
        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=OpenCageKey`
        );

        const address = res.data.results[0].formatted;
        console.log(address)

        setFormData({
          ...formData,
          address: address
        });

      } catch (err) {
        console.log(err);
      }
    },
    (error) => {
      alert("Location permission denied");
    }
  );
};