import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the enchant activity.
 */
export default class EnchantSheet extends ActivitySheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["enchant-activity"]
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,
    effect: {
      template: "systems/dnd5r/templates/activity/enchant-effect.hbs",
      templates: [
        "systems/dnd5r/templates/activity/parts/enchant-enchantments.hbs",
        "systems/dnd5r/templates/activity/parts/enchant-restrictions.hbs"
      ]
    }
  };

  /* -------------------------------------------- */

  /** @override */
  tabGroups = {
    sheet: "identity",
    activation: "time",
    effect: "enchantments"
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @override */
  _prepareAppliedEffectContext(context, effect) {
    effect.activityOptions = this.item.system.activities
      .filter(a => a.id !== this.activity.id)
      .map(a => ({ value: a.id, label: a.name, selected: effect.data.riders.activity.has(a.id) }));
    effect.effectOptions = context.allEffects.map(e => ({
      ...e, selected: effect.data.riders.effect.has(e.value)
    }));
    return effect;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareEffectContext(context) {
    context = await super._prepareEffectContext(context);

    const appliedEnchantments = new Set(context.activity.effects?.map(e => e._id) ?? []);
    context.allEnchantments = this.item.effects
      .filter(e => e.type === "enchantment")
      .map(effect => ({
        value: effect.id, label: effect.name, selected: appliedEnchantments.has(effect.id)
      }));

    const enchantableTypes = this.activity.enchantableTypes;
    context.typeOptions = [
      { value: "", label: game.i18n.localize("DND5R.ENCHANT.FIELDS.restrictions.type.Any") },
      ...Object.keys(CONFIG.Item.dataModels)
        .filter(t => enchantableTypes.has(t))
        .map(value => ({ value, label: game.i18n.localize(CONFIG.Item.typeLabels[value]) }))
    ];

    const type = context.source.restrictions.type;
    const typeDataModel = CONFIG.Item.dataModels[type];
    if ( typeDataModel ) context.categoryOptions = Object.entries(typeDataModel.itemCategories ?? {})
      .map(([value, config]) => ({ value, label: foundry.utils.getType(config) === "string" ? config : config.label }));

    context.propertyOptions = (CONFIG.DND5R.validProperties[type] ?? [])
      .map(value => ({ value, label: CONFIG.DND5R.itemProperties[value]?.label ?? value }));

    return context;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _getTabs() {
    const tabs = super._getTabs();
    tabs.effect.label = "DND5R.ENCHANT.SECTIONS.Enchanting";
    tabs.effect.icon = "fa-solid fa-wand-sparkles";
    tabs.effect.tabs = this._markTabs({
      enchantments: {
        id: "enchantments", group: "effect", icon: "fa-solid fa-star",
        label: "DND5R.ENCHANT.SECTIONS.Enchantments"
      },
      restrictions: {
        id: "restrictions", group: "effect", icon: "fa-solid fa-ban",
        label: "DND5R.ENCHANT.SECTIONS.Restrictions"
      }
    });
    return tabs;
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @override */
  _addEffectData() {
    return {
      type: "enchantment",
      name: this.item.name,
      img: this.item.img,
      disabled: true
    };
  }
}
