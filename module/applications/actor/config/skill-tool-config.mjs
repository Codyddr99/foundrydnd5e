import BaseProficiencyConfig from "./base-proficiency-config.mjs";

/**
 * Configuration application for an actor's skills & tools.
 */
export default class SkillToolConfig extends BaseProficiencyConfig {

  /** @override */
  static PARTS = {
    config: {
      template: "systems/dnd5r/templates/actors/config/skill-tool-config.hbs"
    }
  };

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Configuration data for the ability being edited.
   * @type {SkillConfiguration|ToolConfiguration}
   */
  get propertyConfig() {
    return CONFIG.DND5R[this.options.trait === "skills" ? "skills" : "tools"][this.options.key];
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    context.abilityOptions = Object.entries(CONFIG.DND5R.abilities).map(([value, { label }]) => ({ value, label }));
    context.proficiencyOptions = Object.entries(CONFIG.DND5R.proficiencyLevels)
      .map(([value, label]) => ({ value, label }));
    context.section = `DND5R.${this.options.trait === "skills" ? "SKILL" : "TOOL"}.SECTIONS.`;
    context.global.skill = this.options.trait === "skills";
    return context;
  }
}
