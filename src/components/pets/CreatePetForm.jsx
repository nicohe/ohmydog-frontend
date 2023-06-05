export default function CreatePetForm({ onSubmit, errors }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log("submitting", values);

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        {errors.non_field_errors ? (
          <p style={{ color: "red" }}>{errors.non_field_errors[0]}</p>
        ) : null}

        <label htmlFor="nameField">Nombre</label>
        <input type="text" name="name" id="nameField" />
        {errors.name ? <p style={{ color: "red" }}>{errors.name[0]}</p> : null}

        <label htmlFor="breedField">Raza</label>
        <input type="text" name="breed" id="breedField" />
        {errors.breed ? (
          <p style={{ color: "red" }}>{errors.breed[0]}</p>
        ) : null}

        <label htmlFor="colorField">Color</label>
        <input type="text" name="color" id="colorField" />
        {errors.color ? (
          <p style={{ color: "red" }}>{errors.color[0]}</p>
        ) : null}

        <label htmlFor="birthdateField">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthdate"
          id="birthdateField"
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.birthdate ? (
          <p style={{ color: "red" }}>{errors.birthdate[0]}</p>
        ) : null}

        <input className="button-primary" type="submit" value="Agregar" />
      </fieldset>
    </form>
  );
}
