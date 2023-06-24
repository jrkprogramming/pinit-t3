/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState, useCallback, useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import LatLngContext from "../../contexts/latLng";
import { api, type RouterOutputs } from "~/utils/api";
import Link from "next/link";
import latLng from "../../contexts/latLng";
import { LoadScript } from "@react-google-maps/api";
import style from "./createPin.module.css";
import { useRouter } from "next/router";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function CreatePinPage() {
  const router = useRouter();
  const latLngContext = useContext(LatLngContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    lng: latLngContext?.data?.lng ?? 0,
    lat: latLngContext?.data?.lat ?? 0,
  });

  const createPin = api.pin.create.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push("/home");
      console.log("created pin");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPin.mutate({
      name: formData.name,
      address: formData.address,
      city: formData.city,
      description: formData.description,
      lng: formData.lng,
      lat: formData.lat,
    });
  };
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value: string): Promise<void> => {
    const results = await geocodeByAddress(value);
    if (results && results.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const latLng = await getLatLng(results[0]);
      const name = value.split(",");
      const newName = name[0];
      const city = name[2];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setAddress(results[0]?.formatted_address || "");
      setFormData({
        name: newName || "",
        city: city || "",
        address: results[0]?.formatted_address || "",
        description: "",
        lat: latLng?.lat ?? 0,
        lng: latLng?.lng ?? 0,
      });
    }
  };

  const handlePlaceSelect = (value: string): void => {
    handleSelect(value).catch((error) => {
      // Handle any errors during place selection
      console.error("Error selecting place:", error);
    });
  };

  return (
    // <LoadScript
    //   googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    // >
    <div className={style.pins}>
      <form onSubmit={handleSubmit} className={style.form} id={style.pform}>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handlePlaceSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div id={style.ac}>
              <div className={style.ac}>
                {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
                <input {...getInputProps({ placeholder: "Search Address" })} />
              </div>

              <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion, i) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#c0ffee" : "#fff",
                  };

                  return (
                    <div
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      key={i}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {" "}
                      {suggestion.description}{" "}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <div id={style.pinputs}>
          <div className={`${style.pdiv ?? ""} ${style.formDiv ?? ""}`}>
            <label htmlFor="name">Name of location</label>
            <input
              type="text"
              name="name"
              id={style.name}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={`${style.pdiv ?? ""} ${style.formDiv ?? ""}`}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id={style.address}
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className={`${style.pdiv ?? ""} ${style.formDiv ?? ""}`}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id={style.city}
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className={`${style.pdiv ?? ""} ${style.formDiv ?? ""}`}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id={style.description}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={handleChange}
            />
          </div>
        </div>

        <input
          type="hidden"
          name="lat"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={formData?.lat || ""}
          onChange={handleChange}
        />
        <input
          type="hidden"
          name="lng"
          value={formData?.lng || ""}
          onChange={handleChange}
        />

        <input
          type="submit"
          value="Mark It Down"
          className={`${style.button} ${style.pbutton}`}
        />
      </form>
    </div>
    // </LoadScript>
  );
}
