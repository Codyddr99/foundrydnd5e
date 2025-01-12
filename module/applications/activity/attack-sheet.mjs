import { safePropertyExists } from "../../utils.mjs";
import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the attack activity.
 */
export default class AttackSheet extends ActivitySheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["attack-activity"]
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,
    identity: {
      template: "systems/dnd5r/templates/activity/attack-identity.hbs",
      templates: [
        ...super.PARTS.identity.templates,
        "systems/dnd5r/templates/activity/parts/attack-identity.hbs"
      ]
    },
    effect: {
      template: "systems/dnd5r/templates/activity/attack-effect.hbs",
      templates: [
        ...super.PARTS.effect.templates,
        "systems/dnd5r/templates/activity/parts/attack-damage.hbs",
        "systems/dnd5r/templates/activity/parts/attack-details.hbs",
        "systems/dnd5r/templates/activity/parts/damage-part.hbs",
        "systems/dnd5r/templates/activity/parts/damage-parts.hbs"
      ]
    }
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareEffectContext(context) {
    context = await super._prepareEffectContext(context);

    const availableAbilities = this.activity.availableAbilities;
    context.abilityOptions = [
      {
        value: "", label: game.i18n.format("DND5R.DefaultSpecific", {
          default: this.activity.attack.type.classification === "spell"
            ? game.i18n.localize("DND5R.Spellcasting").toLowerCase()
            : availableAbilities.size
              ? game.i18n.getListFormatter({ style: "short", type: "disjunction" }).format(
                Array.from(availableAbilities).map(a => CONFIG.DND5R.abilities[a].label.toLowerCase())
              )
              : game.i18n.localize("DND5R.None").toLowerCase()
        })
      },
      { rule: true },
      { value: "none", label: game.i18n.localize("DND5R.None") },
      { value: "spellcasting", label: game.i18n.localize("DND5R.Spellcasting") },
      ...Object.entries(CONFIG.DND5R.abilities).map(([value, config]) => ({
        value, label: config.label, group: game.i18n.localize("DND5R.Abilities")
      }))
    ];

    context.hasBaseDamage = this.item.system.offersBaseDamage;

    return context;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareIdentityContext(context) {
    context = await super._prepareIdentityContext(context);

    context.attackTypeOptions = Object.entries(CONFIG.DND5R.attackTypes)
      .map(([value, config]) => ({ value, label: config.label }));
    if ( this.item.system.attackType ) context.attackTypeOptions.unshift({
      value: "",
      label: game.i18n.format("DND5R.DefaultSpecific", {
        default: CONFIG.DND5R.attackTypes[this.item.system.attackType].label.toLowerCase()
      })
    });

    context.attackClassificationOptions = Object.entries(CONFIG.DND5R.attackClassifications)
      .map(([value, config]) => ({ value, label: config.label }));
    if ( this.item.system.attackClassification ) context.attackClassificationOptions.unshift({
      value: "",
      label: game.i18n.format("DND5R.DefaultSpecific", {
        default: CONFIG.DND5R.attackClassifications[this.item.system.attackClassification].label.toLowerCase()
      })
    });

    return context;
  }
}
