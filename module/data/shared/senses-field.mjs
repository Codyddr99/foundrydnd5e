const { NumberField, StringField } = foundry.data.fields;

/**
 * Field for storing senses data.
 */
export default class SensesField extends foundry.data.fields.SchemaField {
  constructor(fields={}, options={}) {
    const numberConfig = { required: true, nullable: true, integer: true, min: 0, initial: null };
    fields = {
      darkvision: new NumberField({ ...numberConfig, label: "DND5R.SenseDarkvision" }),
      blindsight: new NumberField({ ...numberConfig, label: "DND5R.SenseBlindsight" }),
      tremorsense: new NumberField({ ...numberConfig, label: "DND5R.SenseTremorsense" }),
      truesight: new NumberField({ ...numberConfig, label: "DND5R.SenseTruesight" }),
      units: new StringField({
        required: true, nullable: true, blank: false, initial: null, label: "DND5R.SenseUnits"
      }),
      special: new StringField({ required: true, label: "DND5R.SenseSpecial" }),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "DND5R.Senses", ...options });
  }
}
