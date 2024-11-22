const { StringField } = foundry.data.fields;

/**
 * Field for storing creature type data.
 */
export default class CreatureTypeField extends foundry.data.fields.SchemaField {
  constructor(fields={}, options={}) {
    fields = {
      value: new StringField({ blank: true, label: "DND5R.CreatureType" }),
      subtype: new StringField({ label: "DND5R.CreatureTypeSelectorSubtype" }),
      swarm: new StringField({ blank: true, label: "DND5R.CreatureSwarmSize" }),
      custom: new StringField({ label: "DND5R.CreatureTypeSelectorCustom" }),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "DND5R.CreatureType", ...options });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  initialize(value, model, options={}) {
    const obj = super.initialize(value, model, options);

    Object.defineProperty(obj, "label", {
      get() {
        return dnd5r.documents.Actor5e.formatCreatureType(this);
      },
      enumerable: false
    });
    Object.defineProperty(obj, "config", {
      get() {
        return CONFIG.DND5R.creatureTypes[this.value];
      },
      enumerable: false
    });

    return obj;
  }
}
