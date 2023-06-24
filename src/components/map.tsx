/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  useLoadScript,
  Marker,
  InfoWindow,
  GoogleMap,
  InfoBox,
  LoadScript,
} from "@react-google-maps/api";
import Link from "next/link";
import style from "./map";
import LatLngContext from "../contexts/latLng";
import { api, type RouterOutputs } from "~/utils/api";

interface Coordinates {
  lat: number;
  lng: number;
}

const mapContainerStyle = {
  width: "100vw",
  height: "80vh",
};

const center = {
  lat: 36,
  lng: -100,
};

const Map = (
  {
    // all of this needs to be called in the component via prisma/trpc
    // latLng,
    // setLatLng,
    // infoLatLng,
    // setInfoLatLng,
    // setAllPins,
    // allPins,
    // pinInfo,
    // setPinInfo,
    // searchBar,
  }
) => {
  const [latLng, setLatLng] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const [infoLatLng, setInfoLatLng] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  // const [allPins, setAllPins] = useState([{}]);

  const [pinInfo, setPinInfo] = useState({
    _id: "",
    name: "",
    address: "",
    city: "",
    lat: null,
    lng: null,
  });

  // prisma findAll
  // const searchedPins = allPins?.filter(function (el) {
  //   return (
  //     el?.name?.includes(searchBar) ||
  //     el?.address?.includes(searchBar) ||
  //     el?.city?.includes(searchBar) ||
  //     el?.description?.includes(searchBar) ||
  //     el?.Owner?.username.includes(searchBar)
  //   );
  // });

  // const [userCenter, setUserCenter] = useState<{
  //   lat: number | null;
  //   lng: number | null;
  // }>({
  //   lat: null,
  //   lng: null,
  // });

  // useEffect(() => {
  //   const lat: string | null = sessionStorage.getItem("lat");
  //   const lng: string | null = sessionStorage.getItem("lng");

  //   const parsedLat: number | null = lat ? parseFloat(lat) : null;
  //   const parsedLng: number | null = lng ? parseFloat(lng) : null;

  //   setUserCenter((prevState) => ({
  //     ...prevState,
  //     lat: parsedLat,
  //     lng: parsedLng,
  //   }));
  // }, []);

  // const userCenterLatLng: google.maps.LatLngLiteral | undefined =
  //   userCenter.lat && userCenter.lng
  //     ? { lat: userCenter.lat, lng: userCenter.lng }
  //     : undefined;

  // const infoWindowPosition: google.maps.LatLngLiteral | undefined =
  //   latLng.lat !== null && latLng.lng !== null
  //     ? { lat: parseFloat(latLng.lat), lng: parseFloat(latLng.lng) }
  //     : undefined;
  const { setData } = useContext(LatLngContext);
  const [clickedLatLng, setClickedLatLng] = useState<Coordinates | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const { data: sessionData } = useSession();
  const { data: pins } = api.pin.getAll.useQuery(
    undefined, // no input
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // enabled: sessionData?.user !== undefined,
      onSuccess: () => {
        // setSelectedRecipe(selectedRecipe ?? data[0] ?? null);
        console.log("recipes rendered!");
      },
    }
  );

  return (
    // <LoadScript
    //   googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    // >
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
      center={center}
      onClick={(e) => {
        if (e.latLng) {
          const clickedLatLng: Coordinates = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          };
          setLatLng(clickedLatLng);
          setClickedLatLng(clickedLatLng);
          setData(clickedLatLng);
        }
      }}
      options={{
        mapTypeId: "terrain",
        styles: [
          {
            elementType: "labels",
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
          { elementType: "geometry", stylers: [{ color: "#3b3c3d" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#b8845d" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263e41" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#182230" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#111d2f" }],
          },
        ],
      }}
    >
      {pins?.map((location, i) => {
        return (
          <Marker
            key={i}
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
            onClick={(e) => {
              if (e.latLng) {
                setLatLng({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                });
                setInfoLatLng({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                });
                // setPinInfo(location);
              }
            }}
          ></Marker>
        );
      })}

      {latLng.lat && (
        <InfoWindow
          position={{
            lat: parseFloat(latLng.lat),
            lng: parseFloat(latLng.lng),
          }}
          onCloseClick={() => {
            setLatLng({
              lat: "",
              lng: "",
            });
          }}
        >
          {latLng.lat === infoLatLng.lat && latLng.lng === infoLatLng.lng ? (
            <div>
              <div>{pinInfo.name}</div>
              <div>{pinInfo.address}</div>
              {/* <div>Created By: {pinInfo.Owner?.username}</div> */}
              <br></br>
              <Link href={`/pins/${pinInfo._id}`}>View More</Link>
            </div>
          ) : (
            <div className="placement">
              <div>
                <Link href="/createPin">ADD A PIN</Link>
              </div>
            </div>
          )}
        </InfoWindow>
      )}
    </GoogleMap>
    // </LoadScript>
  );
};

export default Map;
