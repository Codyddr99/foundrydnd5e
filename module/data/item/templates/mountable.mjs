import SystemDataModel from "../../abstract.mjs";

const { BooleanField, NumberField, SchemaField, StringField } = foundry.data.fields;

/**
 * Data model template for equipment that can be mounted on a vehicle.
 *
 * @property {object} armor          Equipment's armor class.
 * @property {number} armor.value    Armor class value for equipment.
 * @property {number} cover          Amount of cover does this item affords to its crew on a vehicle.
 * @property {boolean} crewed        Is this equipment currently crewed?
 * @property {object} hp             Equipment's hit points.
 * @property {number} hp.value       Current hit point value.
 * @property {number} hp.max         Max hit points.
 * @property {number} hp.dt          Damage threshold.
 * @property {string} hp.conditions  Conditions that are triggered when this equipment takes damage.
 * @property {object} speed               Speed granted by a piece of vehicle equipment.
 * @property {number} speed.value         Speed granted by this piece of equipment measured in feet or meters
 *                                        depending on system setting.
 * @property {string} speed.conditions    Conditions that may affect item's speed.
 * @mixin
 */
export default class MountableTemplate extends SystemDataModel {
  /** @inheritDoc */
  static defineSchema() {
    return {
      armor: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, label: "DND5R.ArmorClass" })
      }, {label: "DND5R.ArmorClass"}),
      cover: new NumberField({ min: 0, max: 1, label: "DND5R.Cover" }),
      crewed: new BooleanField({ label: "DND5R.Crewed" }),
      hp: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, label: "DND5R.HitPointsCurrent" }),
        max: new NumberField({ required: true, integer: true, min: 0, label: "DND5R.HitPointsMax" }),
        dt: new NumberField({ required: true, integer: true, min: 0, label: "DND5R.DamageThreshold" }),
        conditions: new StringField({required: true, label: "DND5R.HealthConditions"})
      }, {label: "DND5R.HitPoints"}),
      speed: new SchemaField({
        value: new NumberField({required: true, min: 0, label: "DND5R.Speed"}),
        conditions: new StringField({required: true, label: "DND5R.SpeedConditions"})
      }, {required: false, initial: undefined, label: "DND5R.Speed"})
    };
  }
}
