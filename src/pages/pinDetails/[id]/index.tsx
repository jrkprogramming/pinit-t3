/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import style from "./[id].module.css";
import { useRouter } from "next/router";
import { api, type RouterOutputs } from "~/utils/api";

export default function PinDetailsPage() {
  const router = useRouter();
  const { id, name, address, city, description, lat, lng } = router.query;

  function handleDeletePin(id: string | string[] | undefined) {
    if (typeof id === "string") {
      void deletePin.mutate({ id: id });
    }
  }

  const deletePin = api.pin.delete.useMutation({
    onSuccess: () => {
      console.log("go back to map page.... gotta add functionality");
    },
  });
  return (
    <div className={style.bodyContainer}>
      <section className={style.sectionContainer}>
        {/* <div className={style.container}> */}
        <div className={style.left}>
          <div className={style.infoContainer}>
            <h2>
              {/* <FaCity className="icon" /> */}
              <br></br> {city}
            </h2>
            <br></br>

            <h2>
              {/* <FaMapMarkedAlt className="icon" />  */}
              <br></br> {address}
            </h2>
            <br></br>
            {/* <div className="imgContainer">
              <img src={image} alt={image_id}></img>
            </div> */}

            <p>
              {lng}, {lat}
            </p>
          </div>
        </div>

        <div className={style.right}>
          <h1>{name}</h1>
          <p>{description}</p>
          {/* <p>Pin Created By: {pinInfo.Owner?.username}</p> */}
          <div className={style.BtnContainer}>
            {/* {user && pinInfo?.user === user._id ? ( */}
            <div id="btn">
              <Link href={`/pins/edit/${id}`}>Edit Pin</Link>
              <button className={style.btn} onClick={() => handleDeletePin(id)}>
                DELETE
              </button>
            </div>
            {/* ) : null} */}
          </div>
        </div>
        {/* </div> */}
      </section>
    </div>
  );
}
