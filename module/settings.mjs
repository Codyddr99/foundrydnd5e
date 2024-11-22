import { ModuleArtConfig } from "./module-art.mjs";
import CompendiumBrowserSourceConfig from "./applications/compendium-browser-source-config.mjs";
import BastionConfig, { BastionSetting } from "./applications/bastion.mjs";
import * as Bastion from "./documents/actor/bastion.mjs";

/**
 * Register all of the system's keybindings.
 */
export function registerSystemKeybindings() {
  game.keybindings.register("dnd5r", "skipDialogNormal", {
    name: "KEYBINDINGS.DND5R.SkipDialogNormal",
    editable: [{ key: "ShiftLeft" }, { key: "ShiftRight" }]
  });

  game.keybindings.register("dnd5r", "skipDialogAdvantage", {
    name: "KEYBINDINGS.DND5R.SkipDialogAdvantage",
    editable: [{ key: "AltLeft" }, { key: "AltRight" }]
  });

  game.keybindings.register("dnd5r", "skipDialogDisadvantage", {
    name: "KEYBINDINGS.DND5R.SkipDialogDisadvantage",
    editable: [{ key: "ControlLeft" }, { key: "ControlRight" }, { key: "OsLeft" }, { key: "OsRight" }]
  });
}

/* -------------------------------------------- */

/**
 * Register all of the system's settings.
 */
export function registerSystemSettings() {
  // Internal System Migration Version
  game.settings.register("dnd5r", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  // Challenge visibility
  game.settings.register("dnd5r", "challengeVisibility", {
    name: "SETTINGS.5eChallengeVisibility.Name",
    hint: "SETTINGS.5eChallengeVisibility.Hint",
    scope: "world",
    config: true,
    default: "player",
    type: String,
    choices: {
      all: "SETTINGS.5eChallengeVisibility.All",
      player: "SETTINGS.5eChallengeVisibility.Player",
      none: "SETTINGS.5eChallengeVisibility.None"
    }
  });

  game.settings.register("dnd5r", "attackRollVisibility", {
    name: "SETTINGS.5eAttackRollVisibility.Name",
    hint: "SETTINGS.5eAttackRollVisibility.Hint",
    scope: "world",
    config: true,
    default: "none",
    type: String,
    choices: {
      all: "SETTINGS.5eAttackRollVisibility.All",
      hideAC: "SETTINGS.5eAttackRollVisibility.HideAC",
      none: "SETTINGS.5eAttackRollVisibility.None"
    }
  });

  game.settings.register("dnd5r", "bloodied", {
    name: "SETTINGS.DND5R.BLOODIED.Name",
    hint: "SETTINGS.DND5R.BLOODIED.Hint",
    scope: "world",
    config: true,
    default: "player",
    type: String,
    choices: {
      all: "SETTINGS.DND5R.BLOODIED.All",
      player: "SETTINGS.DND5R.BLOODIED.Player",
      none: "SETTINGS.DND5R.BLOODIED.None"
    }
  });

  // Encumbrance tracking
  game.settings.register("dnd5r", "encumbrance", {
    name: "SETTINGS.5eEncumbrance.Name",
    hint: "SETTINGS.5eEncumbrance.Hint",
    scope: "world",
    config: true,
    default: "none",
    type: String,
    choices: {
      none: "SETTINGS.5eEncumbrance.None",
      normal: "SETTINGS.5eEncumbrance.Normal",
      variant: "SETTINGS.5eEncumbrance.Variant"
    }
  });

  // Rules version
  game.settings.register("dnd5r", "rulesVersion", {
    name: "SETTINGS.DND5R.RULESVERSION.Name",
    hint: "SETTINGS.DND5R.RULESVERSION.Hint",
    scope: "world",
    config: true,
    default: "modern",
    type: String,
    choices: {
      modern: "SETTINGS.DND5R.RULESVERSION.Modern",
      legacy: "SETTINGS.DND5R.RULESVERSION.Legacy"
    },
    requiresReload: true
  });

  // Rest Recovery Rules
  game.settings.register("dnd5r", "restVariant", {
    name: "SETTINGS.5eRestN",
    hint: "SETTINGS.5eRestL",
    scope: "world",
    config: true,
    default: "normal",
    type: String,
    choices: {
      normal: "SETTINGS.5eRestPHB",
      gritty: "SETTINGS.5eRestGritty",
      epic: "SETTINGS.5eRestEpic"
    }
  });

  // Diagonal Movement Rule
  if ( game.release.generation < 12 ) {
    game.settings.register("dnd5r", "diagonalMovement", {
      name: "SETTINGS.5eDiagN",
      hint: "SETTINGS.5eDiagL",
      scope: "world",
      config: true,
      default: "555",
      type: String,
      choices: {
        555: "SETTINGS.5eDiagPHB",
        5105: "SETTINGS.5eDiagDMG",
        EUCL: "SETTINGS.5eDiagEuclidean"
      },
      onChange: rule => canvas.grid.diagonalRule = rule
    });
  }

  // Allow rotating square templates
  game.settings.register("dnd5r", "gridAlignedSquareTemplates", {
    name: "SETTINGS.5eGridAlignedSquareTemplatesN",
    hint: "SETTINGS.5eGridAlignedSquareTemplatesL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Proficiency modifier type
  game.settings.register("dnd5r", "proficiencyModifier", {
    name: "SETTINGS.5eProfN",
    hint: "SETTINGS.5eProfL",
    scope: "world",
    config: true,
    default: "bonus",
    type: String,
    choices: {
      bonus: "SETTINGS.5eProfBonus",
      dice: "SETTINGS.5eProfDice"
    }
  });

  // Allow feats during Ability Score Improvements
  game.settings.register("dnd5r", "allowFeats", {
    name: "SETTINGS.5eFeatsN",
    hint: "SETTINGS.5eFeatsL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Use Honor ability score
  game.settings.register("dnd5r", "honorScore", {
    name: "SETTINGS.5eHonorN",
    hint: "SETTINGS.5eHonorL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Use Sanity ability score
  game.settings.register("dnd5r", "sanityScore", {
    name: "SETTINGS.5eSanityN",
    hint: "SETTINGS.5eSanityL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Apply Dexterity as Initiative Tiebreaker
  game.settings.register("dnd5r", "initiativeDexTiebreaker", {
    name: "SETTINGS.5eInitTBN",
    hint: "SETTINGS.5eInitTBL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Record Currency Weight
  game.settings.register("dnd5r", "currencyWeight", {
    name: "SETTINGS.5eCurWtN",
    hint: "SETTINGS.5eCurWtL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Leveling Mode
  game.settings.register("dnd5r", "levelingMode", {
    name: "SETTINGS.DND5R.LEVELING.Name",
    hint: "SETTINGS.DND5R.LEVELING.Hint",
    scope: "world",
    config: true,
    default: "xpBoons",
    choices: {
      noxp: "SETTINGS.DND5R.LEVELING.NoXP",
      xp: "SETTINGS.DND5R.LEVELING.XP",
      xpBoons: "SETTINGS.DND5R.LEVELING.XPBoons"
    }
  });

  // Disable Advancements
  game.settings.register("dnd5r", "disableAdvancements", {
    name: "SETTINGS.5eNoAdvancementsN",
    hint: "SETTINGS.5eNoAdvancementsL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Concentration Tracking
  game.settings.register("dnd5r", "disableConcentration", {
    name: "SETTINGS.5eNoConcentrationN",
    hint: "SETTINGS.5eNoConcentrationL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Collapse Item Cards (by default)
  game.settings.register("dnd5r", "autoCollapseItemCards", {
    name: "SETTINGS.5eAutoCollapseCardN",
    hint: "SETTINGS.5eAutoCollapseCardL",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: s => {
      ui.chat.render();
    }
  });

  // Collapse Chat Card Trays
  game.settings.register("dnd5r", "autoCollapseChatTrays", {
    name: "SETTINGS.DND5R.COLLAPSETRAYS.Name",
    hint: "SETTINGS.DND5R.COLLAPSETRAYS.Hint",
    scope: "client",
    config: true,
    default: "older",
    type: String,
    choices: {
      never: "SETTINGS.DND5R.COLLAPSETRAYS.Never",
      older: "SETTINGS.DND5R.COLLAPSETRAYS.Older",
      always: "SETTINGS.DND5R.COLLAPSETRAYS.Always"
    }
  });

  // Allow Polymorphing
  game.settings.register("dnd5r", "allowPolymorphing", {
    name: "SETTINGS.5eAllowPolymorphingN",
    hint: "SETTINGS.5eAllowPolymorphingL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Polymorph Settings
  game.settings.register("dnd5r", "polymorphSettings", {
    scope: "client",
    default: {
      keepPhysical: false,
      keepMental: false,
      keepSaves: false,
      keepSkills: false,
      mergeSaves: false,
      mergeSkills: false,
      keepClass: false,
      keepFeats: false,
      keepSpells: false,
      keepItems: false,
      keepBio: false,
      keepVision: true,
      keepSelf: false,
      keepAE: false,
      keepOriginAE: true,
      keepOtherOriginAE: true,
      keepFeatAE: true,
      keepSpellAE: true,
      keepEquipmentAE: true,
      keepClassAE: true,
      keepBackgroundAE: true,
      transformTokens: true
    }
  });

  // Allow Summoning
  game.settings.register("dnd5r", "allowSummoning", {
    name: "SETTINGS.DND5R.ALLOWSUMMONING.Name",
    hint: "SETTINGS.DND5R.ALLOWSUMMONING.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Metric Unit Weights
  game.settings.register("dnd5r", "metricWeightUnits", {
    name: "SETTINGS.5eMetricN",
    hint: "SETTINGS.5eMetricL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Critical Damage Modifiers
  game.settings.register("dnd5r", "criticalDamageModifiers", {
    name: "SETTINGS.5eCriticalModifiersN",
    hint: "SETTINGS.5eCriticalModifiersL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Critical Damage Maximize
  game.settings.register("dnd5r", "criticalDamageMaxDice", {
    name: "SETTINGS.5eCriticalMaxDiceN",
    hint: "SETTINGS.5eCriticalMaxDiceL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Strict validation
  game.settings.register("dnd5r", "strictValidation", {
    scope: "world",
    config: false,
    type: Boolean,
    default: true
  });

  // Dynamic art.
  game.settings.registerMenu("dnd5r", "moduleArtConfiguration", {
    name: "DND5R.ModuleArtConfigN",
    label: "DND5R.ModuleArtConfigL",
    hint: "DND5R.ModuleArtConfigH",
    icon: "fa-solid fa-palette",
    type: ModuleArtConfig,
    restricted: true
  });

  game.settings.register("dnd5r", "moduleArtConfiguration", {
    name: "Module Art Configuration",
    scope: "world",
    config: false,
    type: Object,
    default: {
      dnd5r: {
        portraits: true,
        tokens: true
      }
    }
  });

  // Compendium Browser source exclusion
  game.settings.registerMenu("dnd5r", "packSourceConfiguration", {
    name: "DND5R.CompendiumBrowser.Sources.Name",
    label: "DND5R.CompendiumBrowser.Sources.Label",
    hint: "DND5R.CompendiumBrowser.Sources.Hint",
    icon: "fas fa-book-open-reader",
    type: CompendiumBrowserSourceConfig,
    restricted: true
  });

  game.settings.register("dnd5r", "packSourceConfiguration", {
    name: "Pack Source Configuration",
    scope: "world",
    config: false,
    type: Object,
    default: {}
  });

  // Bastions
  game.settings.registerMenu("dnd5r", "bastionConfiguration", {
    name: "DND5R.Bastion.Configuration.Name",
    label: "DND5R.Bastion.Configuration.Label",
    hint: "DND5R.Bastion.Configuration.Hint",
    icon: "fas fa-chess-rook",
    type: BastionConfig,
    restricted: true
  });

  game.settings.register("dnd5r", "bastionConfiguration", {
    name: "Bastion Configuration",
    scope: "world",
    config: false,
    type: BastionSetting,
    default: {
      button: false,
      enabled: false,
      duration: 7
    },
    onChange: () => game.dnd5r.bastion.initializeUI()
  });

  // Primary Group
  game.settings.register("dnd5r", "primaryParty", {
    name: "Primary Party",
    scope: "world",
    config: false,
    default: null,
    type: PrimaryPartyData,
    onChange: s => ui.actors.render()
  });

  // Control hints
  game.settings.register("dnd5r", "controlHints", {
    name: "DND5R.Controls.Name",
    hint: "DND5R.Controls.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  // NPC sheet default skills
  game.settings.register("dnd5r", "defaultSkills", {
    name: "SETTINGS.DND5R.DEFAULTSKILLS.Name",
    hint: "SETTINGS.DND5R.DEFAULTSKILLS.Hint",
    type: new foundry.data.fields.SetField(
      new foundry.data.fields.StringField({
        choices: () => CONFIG.DND5R.skills
      })
    ),
    default: [],
    config: true
  });
}

/**
 * Data model for tracking information on the primary party.
 *
 * @property {Actor5e} actor  Group actor representing the primary party.
 */
class PrimaryPartyData extends foundry.abstract.DataModel {
  static defineSchema() {
    return { actor: new foundry.data.fields.ForeignDocumentField(foundry.documents.BaseActor) };
  }
}

/* -------------------------------------------- */

/**
 * Register additional settings after modules have had a chance to initialize to give them a chance to modify choices.
 */
export function registerDeferredSettings() {
  game.settings.register("dnd5r", "theme", {
    name: "SETTINGS.DND5R.THEME.Name",
    hint: "SETTINGS.DND5R.THEME.Hint",
    scope: "client",
    config: false,
    default: "",
    type: String,
    choices: {
      "": "SHEETS.DND5R.THEME.Automatic",
      ...CONFIG.DND5R.themes
    },
    onChange: s => setTheme(document.body, s)
  });

  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("dnd5r", "theme"));
  });
  matchMedia("(prefers-contrast: more)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("dnd5r", "theme"));
  });

  // Hook into core color scheme setting.
  const isV13 = game.release.generation >= 13;
  const settingKey = isV13 ? "uiConfig" : "colorScheme";
  const setting = game.settings.get("core", settingKey);
  const settingConfig = game.settings.settings.get(`core.${settingKey}`);
  const { onChange } = settingConfig ?? {};
  if ( onChange ) settingConfig.onChange = s => {
    onChange();
    setTheme(document.body, isV13 ? s.colorScheme : s);
  };
  setTheme(document.body, isV13 ? setting.colorScheme : setting);
}

/* -------------------------------------------- */

/**
 * Set the theme on an element, removing the previous theme class in the process.
 * @param {HTMLElement} element     Body or sheet element on which to set the theme data.
 * @param {string} [theme=""]       Theme key to set.
 * @param {Set<string>} [flags=[]]  Additional theming flags to set.
 */
export function setTheme(element, theme="", flags=new Set()) {
  element.className = element.className.replace(/\bdnd5r-(theme|flag)-[\w-]+\b/g, "");

  // Primary Theme
  if ( !theme && (element === document.body) ) {
    if ( matchMedia("(prefers-color-scheme: dark)").matches ) theme = "dark";
    if ( matchMedia("(prefers-color-scheme: light)").matches ) theme = "light";
  }
  if ( theme ) {
    element.classList.add(`dnd5r-theme-${theme.slugify()}`);
    element.dataset.theme = theme;
  }
  else delete element.dataset.theme;

  // Additional Flags
  if ( (element === document.body) && matchMedia("(prefers-contrast: more)").matches ) flags.add("high-contrast");
  for ( const flag of flags ) element.classList.add(`dnd5r-flag-${flag.slugify()}`);
  element.dataset.themeFlags = Array.from(flags).join(" ");
}
