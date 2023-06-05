import { useContext, useEffect } from "react";
import PetsContext from "../contexts/PetsContext";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function PetDetailPage() {
  const params = useParams();
  const { petsLoading, retrievePet, petDetail } = useContext(PetsContext);

  useEffect(() => {
    retrievePet(params.petId);
  }, []);

  return (
    <Loader loading={petsLoading}>
      <div>
        <p>Nombre: {petDetail.name}</p>
        <p>Raza: {petDetail.breed}</p>
        <p>Color: {petDetail.color}</p>
        <p>Fecha de nacimiento: {petDetail.birthdate}</p>
      </div>
    </Loader>
  );
}
