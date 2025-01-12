import FormulaField from "../fields/formula-field.mjs";
import SourceField from "../shared/source-field.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CommonTemplate from "./templates/common.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";

const { ArrayField, BooleanField, NumberField, SchemaField, StringField } = foundry.data.fields;

/**
 * System data definition for Vehicles.
 *
 * @property {string} vehicleType                      Type of vehicle as defined in `DND5R.vehicleTypes`.
 * @property {object} attributes
 * @property {object} attributes.ac
 * @property {number} attributes.ac.flat               Flat value used for flat or natural armor calculation.
 * @property {string} attributes.ac.calc               Name of one of the built-in formulas to use.
 * @property {string} attributes.ac.formula            Custom formula to use.
 * @property {string} attributes.ac.motionless         Changes to vehicle AC when not moving.
 * @property {object} attributes.hp
 * @property {number} attributes.hp.value              Current hit points.
 * @property {number} attributes.hp.max                Maximum allowed HP value.
 * @property {number} attributes.hp.temp               Temporary HP applied on top of value.
 * @property {number} attributes.hp.tempmax            Temporary change to the maximum HP.
 * @property {number} attributes.hp.dt                 Damage threshold.
 * @property {number} attributes.hp.mt                 Mishap threshold.
 * @property {object} attributes.actions               Information on how the vehicle performs actions.
 * @property {boolean} attributes.actions.stations     Does this vehicle rely on action stations that required
 *                                                     individual crewing rather than general crew thresholds?
 * @property {number} attributes.actions.value         Maximum number of actions available with full crewing.
 * @property {object} attributes.actions.thresholds    Crew thresholds needed to perform various actions.
 * @property {number} attributes.actions.thresholds.2  Minimum crew needed to take full action complement.
 * @property {number} attributes.actions.thresholds.1  Minimum crew needed to take reduced action complement.
 * @property {number} attributes.actions.thresholds.0  Minimum crew needed to perform any actions.
 * @property {object} attributes.capacity              Information on the vehicle's carrying capacity.
 * @property {string} attributes.capacity.creature     Description of the number of creatures the vehicle can carry.
 * @property {number} attributes.capacity.cargo        Cargo carrying capacity measured in tons.
 * @property {object} traits
 * @property {string} traits.dimensions                Width and length of the vehicle.
 * @property {object} cargo                            Details on this vehicle's crew and cargo capacities.
 * @property {PassengerData[]} cargo.crew              Creatures responsible for operating the vehicle.
 * @property {PassengerData[]} cargo.passengers        Creatures just takin' a ride.
 * @property {SourceData} source                       Adventure or sourcebook where this vehicle originated.
 */
export default class VehicleData extends CommonTemplate {

  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  /** @override */
  static LOCALIZATION_PREFIXES = ["DND5R.SOURCE"];

  /* -------------------------------------------- */

  /** @inheritDoc */
  static _systemType = "vehicle";

  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      vehicleType: new StringField({ required: true, initial: "water", label: "DND5R.VehicleType" }),
      attributes: new SchemaField({
        ...AttributesFields.common,
        ac: new SchemaField({
          flat: new NumberField({ integer: true, min: 0, label: "DND5R.ArmorClassFlat" }),
          calc: new StringField({ initial: "default", label: "DND5R.ArmorClassCalculation" }),
          formula: new FormulaField({ deterministic: true, label: "DND5R.ArmorClassFormula" }),
          motionless: new StringField({ required: true, label: "DND5R.ArmorClassMotionless" })
        }, { label: "DND5R.ArmorClass" }),
        hp: new SchemaField({
          value: new NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "DND5R.HitPointsCurrent"
          }),
          max: new NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "DND5R.HitPointsMax"
          }),
          temp: new NumberField({ integer: true, initial: 0, min: 0, label: "DND5R.HitPointsTemp" }),
          tempmax: new NumberField({
            integer: true, initial: 0, label: "DND5R.HitPointsTempMax", hint: "DND5R.HitPointsTempMaxHint"
          }),
          dt: new NumberField({
            required: true, integer: true, min: 0, label: "DND5R.DamageThreshold"
          }),
          mt: new NumberField({
            required: true, integer: true, min: 0, label: "DND5R.VehicleMishapThreshold"
          })
        }, {label: "DND5R.HitPoints"}),
        actions: new SchemaField({
          stations: new BooleanField({ required: true, label: "DND5R.VehicleActionStations" }),
          value: new NumberField({
            required: true, nullable: false, integer: true, initial: 0, min: 0, label: "DND5R.VehicleActionMax"
          }),
          thresholds: new SchemaField({
            2: new NumberField({
              required: true, integer: true, min: 0, label: "DND5R.VehicleActionThresholdsFull"
            }),
            1: new NumberField({
              required: true, integer: true, min: 0, label: "DND5R.VehicleActionThresholdsMid"
            }),
            0: new NumberField({
              required: true, integer: true, min: 0, label: "DND5R.VehicleActionThresholdsMin"
            })
          }, {label: "DND5R.VehicleActionThresholds"})
        }, {label: "DND5R.VehicleActions"}),
        capacity: new SchemaField({
          creature: new StringField({ required: true, label: "DND5R.VehicleCreatureCapacity" }),
          cargo: new NumberField({
            required: true, nullable: false, integer: true, initial: 0, min: 0, label: "DND5R.VehicleCargoCapacity"
          })
        }, { label: "DND5R.VehicleCargoCrew" })
      }, { label: "DND5R.Attributes" }),
      details: new SchemaField(DetailsFields.common, { label: "DND5R.Details" }),
      source: new SourceField(),
      traits: new SchemaField({
        ...TraitsFields.common,
        size: new StringField({ required: true, initial: "lg", label: "DND5R.Size" }),
        di: TraitsFields.makeDamageTrait({ label: "DND5R.DamImm" }, { initial: ["poison", "psychic"] }),
        ci: TraitsFields.makeSimpleTrait({ label: "DND5R.ConImm" }, { initial: [
          "blinded", "charmed", "deafened", "frightened", "paralyzed",
          "petrified", "poisoned", "stunned", "unconscious"
        ] }),
        dimensions: new StringField({ required: true, label: "DND5R.Dimensions" })
      }, { label: "DND5R.Traits" }),
      cargo: new SchemaField({
        crew: new ArrayField(makePassengerData(), { label: "DND5R.VehicleCrew" }),
        passengers: new ArrayField(makePassengerData(), { label: "DND5R.VehiclePassengers" })
      }, { label: "DND5R.VehicleCrewPassengers" })
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  static _migrateData(source) {
    super._migrateData(source);
    AttributesFields._migrateInitiative(source.attributes);
    VehicleData.#migrateSource(source);
  }

  /* -------------------------------------------- */

  /**
   * Convert source string into custom object & move to top-level.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateSource(source) {
    let custom;
    if ( ("details" in source) && ("source" in source.details) ) {
      if ( foundry.utils.getType(source.details?.source) === "string" ) custom = source.details.source;
      else source.source = source.details.source;
    }
    if ( custom ) source.source = { custom };
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareBaseData() {
    this.attributes.prof = 0;
    AttributesFields.prepareBaseArmorClass.call(this);
    AttributesFields.prepareBaseEncumbrance.call(this);
    SourceField.shimActor.call(this);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    const rollData = this.parent.getRollData({ deterministic: true });
    const { originalSaves } = this.parent.getOriginalStats();

    this.prepareAbilities({ rollData, originalSaves });
    AttributesFields.prepareEncumbrance.call(this, rollData, { validateItem: item =>
      (item.flags.dnd5r?.vehicleCargo === true) || !["weapon", "equipment"].includes(item.type)
    });
    AttributesFields.prepareHitPoints.call(this, this.attributes.hp);
    SourceField.prepareData.call(this.source, this.parent._stats?.compendiumSource ?? this.parent.uuid);
  }
}

/* -------------------------------------------- */

/**
 * Data structure for an entry in a vehicle's crew or passenger lists.
 *
 * @typedef {object} PassengerData
 * @property {string} name      Name of individual or type of creature.
 * @property {number} quantity  How many of this creature are onboard?
 */

/**
 * Produce the schema field for a simple trait.
 * @param {object} schemaOptions  Options passed to the outer schema.
 * @returns {PassengerData}
 */
function makePassengerData(schemaOptions={}) {
  return new SchemaField({
    name: new StringField({required: true, label: "DND5R.VehiclePassengerName"}),
    quantity: new NumberField({
      required: true, nullable: false, integer: true, initial: 0, min: 0, label: "DND5R.VehiclePassengerQuantity"
    })
  }, schemaOptions);
}
