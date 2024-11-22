import SystemDataModel from "../abstract.mjs";
import MappingField from "../fields/mapping-field.mjs";

/**
 * A template for currently held currencies.
 *
 * @property {object} currency  Object containing currencies as numbers.
 * @mixin
 */
export default class CurrencyTemplate extends SystemDataModel {
  /** @inheritDoc */
  static defineSchema() {
    return {
      currency: new MappingField(new foundry.data.fields.NumberField({
        required: true, nullable: false, integer: true, min: 0, initial: 0
      }), {initialKeys: CONFIG.DND5R.currencies, initialKeysOnly: true, label: "DND5R.Currency"})
    };
  }

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Get the weight of all of the currency. Always returns 0 if currency weight is disabled in settings.
   * @returns {number}
   */
  get currencyWeight() {
    if ( !game.settings.get("dnd5r", "currencyWeight") ) return 0;
    const count = Object.values(this.currency).reduce((count, value) => count + value, 0);
    const currencyPerWeight = game.settings.get("dnd5r", "metricWeightUnits")
      ? CONFIG.DND5R.encumbrance.currencyPerWeight.metric
      : CONFIG.DND5R.encumbrance.currencyPerWeight.imperial;
    return count / currencyPerWeight;
  }
}
