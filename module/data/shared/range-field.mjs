import { prepareFormulaValue } from "../../utils.mjs";
import FormulaField from "../fields/formula-field.mjs";

const { SchemaField, StringField } = foundry.data.fields;

/**
 * Field for storing range data.
 *
 * @property {string} value                Scalar value for the activity's range.
 * @property {string} units                Units that are used for the range.
 * @property {string} special              Description of any special range details.
 */
export default class RangeField extends SchemaField {
  constructor(fields={}, options={}) {
    fields = {
      value: new FormulaField({ deterministic: true }),
      units: new StringField(),
      special: new StringField(),
      ...fields
    };
    super(fields, options);
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Prepare data for this field. Should be called during the `prepareFinalData` stage.
   * @this {ItemDataModel|BaseActivityData}
   * @param {object} rollData  Roll data used for formula replacements.
   * @param {object} [labels]  Object in which to insert generated labels.
   */
  static prepareData(rollData, labels) {
    this.range.scalar = this.range.units in CONFIG.DND5R.movementUnits;
    if ( this.range.scalar ) {
      prepareFormulaValue(this, "range.value", "DND5R.RANGE.FIELDS.range.value.label", rollData);
    } else this.range.value = null;

    if ( labels && this.range.units ) {
      const parts = [];
      if ( this.range.scalar && this.range.value ) {
        parts.push(
          this.range.value,
          this.range.units in CONFIG.DND5R.movementUnits
            ? game.i18n.localize(`DND5R.Dist${this.range.units.capitalize()}Abbr`) : null
        );
      } else if ( !this.range.scalar ) {
        parts.push(CONFIG.DND5R.distanceUnits[this.range.units]);
      }
      labels.range = parts.filterJoin(" ");
    } else if ( labels ) labels.range = game.i18n.localize("DND5R.DistSelf");
  }
}
