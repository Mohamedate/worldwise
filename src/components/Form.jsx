import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Message from "./Message";
import Spinner from "./Spinner";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const Form = () => {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  useEffect(() => {
    if (!lat && !lng) return;
    async function getCityData() {
      try {
        setMessageError("");
        setIsLoadingLocation(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error("There is no city click another place please 😅");
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
      } catch (err) {
        setMessageError(err.message);
      } finally {
        setIsLoadingLocation(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  function handleSumbit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    createCity(newCity);
    navigate(-1);
  }

  if (isLoadingLocation || isLoading) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking on the map" />;
  if (messageError) {
    return <Message message={messageError} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          dateFormat="yyyy/MM/dd"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
};

export default Form;
