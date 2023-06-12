import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import AppointmentsContext from "../../contexts/AppointmentsContext";

export default function AppointmentListPage() {
  const { appointmentsLoading, listAppointments, appointmentList } =
    useContext(AppointmentsContext);
  const navigate = useNavigate();

  useEffect(() => {
    listAppointments();
  }, []);

  function onClick(event) {
    navigate("/appointments/create");
  }

  return (
    <>
      <h1>Turnos</h1>

      <div className="float-right">
        <button className="button" onClick={onClick}>
          Solicitar turno
        </button>
      </div>

      <Table
        headers={[
          {
            key: "pet_name",
            label: "Mascota",
            wrapper: (value, appointment) => (
              <Link to={`/pets/${appointment.pet_id}`}>{value}</Link>
            ),
          },
          { key: "reason", label: "Motivo" },
          { key: "status", label: "Estado" },
          { key: "date", label: "Fecha" },
          {
            key: "hour",
            label: "Hora",
            wrapper: (value, appointment) =>
              appointment.hour || appointment.timeslot,
          },
          {
            wrapper: (value, appointment) => (
              <Link to={`/appointments/${appointment.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={appointmentList}
        loading={appointmentsLoading}
      />
    </>
  );
}
