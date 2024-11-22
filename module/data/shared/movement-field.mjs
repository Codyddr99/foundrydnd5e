const { BooleanField, NumberField, StringField } = foundry.data.fields;

/**
 * Field for storing movement data.
 */
export default class MovementField extends foundry.data.fields.SchemaField {
  constructor(fields={}, options={}) {
    const numberConfig = { required: true, nullable: true, min: 0, step: 0.1, initial: null };
    fields = {
      burrow: new NumberField({ ...numberConfig, label: "DND5R.MovementBurrow" }),
      climb: new NumberField({ ...numberConfig, label: "DND5R.MovementClimb" }),
      fly: new NumberField({ ...numberConfig, label: "DND5R.MovementFly" }),
      swim: new NumberField({ ...numberConfig, label: "DND5R.MovementSwim" }),
      walk: new NumberField({ ...numberConfig, label: "DND5R.MovementWalk" }),
      units: new StringField({
        required: true, nullable: true, blank: false, initial: null, label: "DND5R.MovementUnits"
      }),
      hover: new BooleanField({ required: true, label: "DND5R.MovementHover" }),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "DND5R.Movement", ...options });
  }
}
